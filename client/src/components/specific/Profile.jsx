/* eslint-disable react/prop-types */
import React from "react";
import { Stack, Avatar , Typography } from "@mui/material";
import {Face as FaceIcon , AlternateEmail as UserNameIcon , CalendarMonth as CalenderIcon } from '@mui/icons-material'
import moment from "moment";
import { transformImage } from "../../lib/features";
const Profile = ({user}) => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        src={transformImage(user?.avatar.url)}
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid White",
        }}
      />
      <ProfileCard text={"Bio"} heading={user.bio} />
      <ProfileCard
        text={"UserName"}
        heading={user.username}
        Icon={<UserNameIcon />}
      />
      <ProfileCard text={"Name"} heading={user.name} Icon={<FaceIcon />} />
      <ProfileCard
        text={"Joined Room"}
        heading={moment(user?.createdAt).fromNow()}
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
