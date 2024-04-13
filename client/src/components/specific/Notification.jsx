/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { memo } from "react";
import {
  Dialog,
  Stack,
  DialogTitle,
  Typography,
  ListItem,
  IconButton,
  Skeleton,
  Button,
  Avatar,
} from "@mui/material";
import { SampleNotifications } from "../constants/sampleData";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { useErrors } from "../../hooks/hook";
import { useSelector, useDispatch } from "react-redux";
import { setIsNotification } from "../../redux/reducers/misc";
import { toast } from "react-hot-toast";
const Notification = () => {
  const dispatch = useDispatch();
  const { isNotification } = useSelector((state) => state.misc);

  const { isLoading, data, error, isError } = useGetNotificationsQuery();
  const notificationClose = () => dispatch(setIsNotification(false));

  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    try {
      const res = await acceptFriendRequest({ requestId: _id, accept });
      if (res.data?.success) {
        toast.success(res.data.message);
      } else toast.error(res.data?.error|| 'something went wrong')
    } catch (error) {
      toast.error('something went wrong');
    }
  };
  useErrors([{ isError, error }]);
  return (
    <Dialog open={isNotification} onClose={notificationClose}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notification</DialogTitle>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests?.length > 0 ? (
              data?.allRequests?.map(({ sender, _id }) => (
                <NotificationItem
                  key={_id}
                  sender={sender}
                  _id={_id}
                  handler={friendRequestHandler}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>0 Notification</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};
// eslint-disable-next-line react/display-name
const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems="center"
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {`${name} sent you a friend request`}
        </Typography>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});
export default Notification;
