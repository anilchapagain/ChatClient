/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "../styles/StyleComponents";
import { Stack, Typography, Box } from "@mui/material";
import { memo } from "react";
import AvatarCard from "./AvatarCard";
import { purpleLight } from "../constants/Color";
import { motion } from 'framer-motion';
import { Delete } from '@mui/icons-material';

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert = [],
  index = 0,
  handelDeleteChat,
}) => {
  return (
    <Link
      sx={{
        padding: "0",
      }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handelDeleteChat(e, _id, groupChat)}
    >
      <motion.div 
        initial={{ opacity: 0, y:'-100%'}}
        whileInView={{ opacity:1, y:0}} 
        transition={{ delay: index*0.1}}
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          padding: "1rem",
          background: sameSender ? purpleLight : "unset",
          color: sameSender ? "white" : "unset",
          position: "relative",
        }}
      >
        <AvatarCard avatar={avatar} />
        <Stack>
          <Typography>{name}</Typography>
          {newMessageAlert && (
            <Typography>
              {newMessageAlert.count}
              {newMessageAlert.count && " New Message"}
            </Typography>
          )}
        </Stack>
        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);