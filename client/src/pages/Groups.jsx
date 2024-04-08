/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { memo, useState } from "react";
import {
  Grid,
  Tooltip,
  IconButton,
  Box,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";
import { KeyboardBackspace, Menu } from "@mui/icons-material";
import { grayColor, orange } from "../components/constants/Color";
import { useNavigate } from "react-router-dom";
import { Link } from "../components/styles/StyleComponents";
import AvatarCard from "../components/shared/AvatarCard";
import { SampleChats } from "./../components/constants/sampleData";
const Groups = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const navigate = useNavigate();
  const navigateBack = () => {
    return navigate("/");
  };
  const handleMobile = () => {
    setIsMobileMenu((prev) => !prev);
  };
  const handleMobileClose = () => {
    setIsMobileMenu(false);
  };
  const iconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <Menu />
        </IconButton>
      </Box>

      <Tooltip title="Back">
        <IconButton
          aria-label="Back"
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: grayColor,
            "&:hover": {
              bgcolor: "rgba(0,0,0,.4)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspace />
        </IconButton>
      </Tooltip>
    </>
  );
  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        bgcolor={orange}
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
      >
        <GroupList myGroups={SampleChats} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {iconBtns}
      </Grid>
      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileMenu}
        onClose={handleMobileClose}
      >
        <GroupList w="50vh" myGroups={SampleChats} />
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => {
  console.log('myGroups',myGroups)
 return (
   <Stack>
    {myGroups.length > 0 ? (
      myGroups.map((group) => {
        return (
          <GroupListItem group={group}
         chatId={chatId} key={group._id}
          />
        )
      })
    ) : (
      <Typography textAlign={"center"} padding={"1rem"}>
        No Groups
      </Typography>
    )}
  </Stack>
 )
};
const GroupListItem = memo(({ group }) => {
  console.log('group',group)
  const { name, avatar, _id, chatId } = group;

  return (
    <Link to={`?group=${_id}`} onClick={(e) => {
      if(chatId === _id) e.preventDefault();
    }}>
      <Stack direction={'row'} position={'relative'} spacing={'1rem'} alignItems={'center'}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Groups;
