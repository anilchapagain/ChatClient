import React from "react";
import { Stack, Avatar , Typography } from "@mui/material";
import {Face as FaceIcon , AlternateEmail as UserNameIcon , CalendarMonth as CalenderIcon } from '@mui/icons-material'
import moment from "moment";
const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid White",
        }}
      />
      <ProfileCard text={"Bio"} heading={"i am the heading"} />
      <ProfileCard
        text={"UserName"}
        heading={"i am the heading"}
        Icon={<UserNameIcon />}
      />
      <ProfileCard
        text={"Name"}
        heading={"i am the heading"}
        Icon={<FaceIcon />}
      />
      <ProfileCard
        text={"Joined Room"}
        heading={moment('2023-11-04').fromNow()}
        Icon={<CalenderIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"black"}
    textAlign={"center"}
  >
    {Icon && Icon}
    <Stack>
      <Typography variant="body1">
{text}
      </Typography>
      <Typography color={'grey'} variant="caption" >{heading}</Typography>
    </Stack>
  </Stack>







);

export default Profile;
