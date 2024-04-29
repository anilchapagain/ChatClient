/* eslint-disable react/prop-types */
import { AttachFile, Create, Send } from "@mui/icons-material";
import { IconButton, Skeleton, Stack, Typography } from "@mui/material";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { grayColor } from "../components/constants/Color";
import {
  ALERT,
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../components/constants/events";
import FileMenu from "../components/dialogs/FileMenu";
import AppLayout from "../components/layout/AppLayout";
import MessageComponent from "../components/shared/MessageComponent";
import { InputBox } from "../components/styles/StyleComponents";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { getSocket } from "../socket";
import { orange } from "./../components/constants/Color";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
import { TypingLoader } from "../components/layout/LoaderLayout";
import { useNavigate } from "react-router-dom";

const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const socket = getSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);
  const bottomRef = useRef(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.message
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const members = chatDetails?.data?.chat?.members;
  const messageOnChange = (e) => {
    setMessage(e.target.value);
    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }
    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, [2000]);
  };

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };


  // useEffect(() => {
  //   if(!chatDetails?.data?.chat) return navigate('/')
  // },[chatDetails.data,navigate])
  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user._id ,members});
    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessage("");
      setMessages([]);
      setOldMessages([]);
      setPage(1);
    socket.emit(CHAT_LEAVED, { userId: user._id, members });


    };
  }, [chatId,dispatch]);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

   useEffect(() => {
     if (chatDetails.isError) {
       return navigate('/')
     }
   }, [chatDetails.isError, navigate]);



  const newMessageHandler = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );
  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(true);
    },
    [chatId]
  );
  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );
   const alertListener = useCallback(
    
     (data) => {
       if (data.chatId !== chatId) return;
       const messageForAlert = {

         content: data.message,
         sender: {
           _id: user._id,
           name: "Admin",
         }, 
         chat: chatId,
         createdAt: new Date().toISOString(),
       };
       setMessages((prev) => [...prev,messageForAlert]);
     },
     [chatId,user._id]
   );

  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessageHandler,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

  useSocketEvents(socket, eventHandler);

  useErrors(errors);
  const allMessages = [...oldMessages, ...messages];

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <Stack
        boxSizing={"border-box"}
        padding={"1rem"}
        paddingBottom={'2rem'}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        ref={containerRef}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {allMessages.map((i) => {
          return <MessageComponent message={i} key={i._id} user={user} />;
        })}

        {userTyping && <TypingLoader />}
        <div ref={bottomRef} />
      </Stack>

      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems="center"
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
            }}
            onClick={handleFileOpen}
          >
            <AttachFile />
          </IconButton>
          <InputBox
            placeholder="Type message Here ...."
            value={message}
            onChange={messageOnChange}
          />
          <IconButton
            type="submit"
            sx={{
              backgroundColor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <Send />
          </IconButton>
        </Stack>
      </form>
      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </>
  );
};

export default AppLayout(Chat);
