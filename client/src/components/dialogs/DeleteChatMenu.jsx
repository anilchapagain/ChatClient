/* eslint-disable react/prop-types */
import { Menu, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setIsDeleteMenu } from "../../redux/reducers/misc";
import { Delete, ExitToApp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAsyncMutation } from "../../hooks/hook";
import { useDeleteChatMutation, useLeaveGroupMutation } from "../../redux/api/api";

const DeleteChatMenu = ({ dispatch, deleteOptionAnchor }) => {
  const navigate = useNavigate();
  const { isDeleteMenu, selectedDeleteChat } = useSelector(
    (state) => state.misc
  );


  const [deleteChat,_,deleteChatData] = useAsyncMutation(useDeleteChatMutation);
  const [leaveGroup,__, leaveGroupData] = useAsyncMutation(
    useLeaveGroupMutation
  );
  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deleteOptionAnchor.current = null
  };
  const leaveGroupHandler = () => {
     closeHandler();
     leaveGroup("Leaving Group ...", { chatId: selectedDeleteChat.chatId });
  };
  const deleteChatHandler = () => {
    closeHandler();
    deleteChat('Deleting CHat ...',{chatId : selectedDeleteChat.chatId})
  };
  useEffect(() => {
if(deleteChatData || leaveGroupData) navigate('/')
  },[deleteChatData,navigate,leaveGroupData])

  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteOptionAnchor.current}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
        sx={{
          width: "10rem",
          padding: "0.5rem",
          cursor: "pointer",
        }}
        onClick={selectedDeleteChat.groupChat ? leaveGroupHandler : deleteChatHandler}
      >
        {selectedDeleteChat.groupChat ? (
          <>
            <ExitToApp /> <Typography>Leave Group</Typography>
          </>
        ) : (
          <>
            <Delete /> <Typography>Delete Chat</Typography>
          </>
        )}
      </Stack>
    </Menu>
  );
};

export default DeleteChatMenu;
