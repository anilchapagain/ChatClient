import React, { useRef } from "react";
import AppLayout from "../components/layout/AppLayout";
import { Stack, IconButton } from "@mui/material";
import { grayColor } from "../components/constants/Color";
import { AttachFile, Send } from "@mui/icons-material";
import { InputBox } from "../components/styles/StyleComponents";
import { orange } from "./../components/constants/Color";
import FileMenu from "../components/dialogs/FileMenu";
import { SampleMessages } from "../components/constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";
const user = {
  _id : "b1",
  name:'Anil'
}
const Chat = () => {
  const containerRef = useRef(null);
  
  // const fileMenuRef = useRef(null);
  return (
    <>
      <Stack
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        ref={containerRef}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >

        {SampleMessages.map((i) => {
          return <MessageComponent message={i} key={i._id} user={user} />;
        })}
      </Stack>

      <form
        style={{
          height: "10%",
        }}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={'1rem'}
          alignItems="center"
          position={"relative"}
         
        >
          <IconButton sx={{
            position:'absolute',
            left:'1.5rem'
          }}
         >
            <AttachFile />
          </IconButton>
          <InputBox placeholder="Type message Here ...." />
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
      <FileMenu  />
    </>
  );
};

export default AppLayout(Chat);
