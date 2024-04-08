/* eslint-disable react/prop-types */
import React, { memo } from "react";
import { ListItem, Stack, Typography, IconButton, Avatar } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const UserItem = ({ user, handler, handlerIsLoading,isAdded=false }) => {
  const { name, _id, avatar } = user;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems="center"
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            "-webkit-line-clamp": 1,
            "-webkit-box-orient": "vertical",
            overflow: "hidden",
            fontWeight: 500,
            lineHeight: 1.25,
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {name}
        </Typography>
        <IconButton
          size="small"
          sx={{
            bgcolor: isAdded ? 'error.main':"primary.main",
            color: "white",
            "&:hover": {
              bgcolor: isAdded ? 'error.dark':"primary.dark",
            },
          }}
          onClick={() => handler(_id)}
          disable={handlerIsLoading}
        >
          {isAdded ? <Remove color="red" /> : <Add />}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
