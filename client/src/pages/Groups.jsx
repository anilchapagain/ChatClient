/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { Suspense, lazy, memo, useEffect, useState } from "react";
import {
  Grid,
  Tooltip,
  IconButton,
  Box,
  Drawer,
  Stack,
  Typography,
  TextField,
  Backdrop,
} from "@mui/material";
import {
  Add,
  Delete,
  Done,
  Edit,
  KeyboardBackspace,
  Menu,
} from "@mui/icons-material";
import { bgGradient, grayColor, orange } from "../components/constants/Color";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/StyleComponents";
import AvatarCard from "../components/shared/AvatarCard";
import { SampleChats, SampleUsers } from "./../components/constants/sampleData";
import { Button } from "@mui/material";
import UserItem from "../components/shared/UserItem";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);
const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);
const isAddMember = false;
const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdated, setGroupNameUpdated] = useState("");
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
  const updateGroupName = () => {
    setIsEdit(false);
    console.log(groupNameUpdated);
  };
  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };
  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };
  const removeMemberHandler = (id) => {

  }
  const deleteHandler = () => {};
  const openAddHandler = () => {};
  useEffect(() => {
   if(chatId){
     setGroupName(`Group Name ${chatId}`);
     setGroupNameUpdated(`Group Name ${chatId}`);
   }
    return () => {
      setGroupName("");
      setGroupNameUpdated("");
      setIsEdit(false);
    };
  }, [chatId]);
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
  const groupNameHtml = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdated}
            onChange={(e) => setGroupNameUpdated(e.target.value)}
          />
          <IconButton onClick={updateGroupName}>
            <Done />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <Edit />
          </IconButton>
        </>
      )}
    </Stack>
  );
  const buttonGroup = (
    <Stack
      direction={{
        sm: "row",
        xs: "column-reverse",
      }}
      spacing={"1rem"}
      p={{
        sm: "1rem",
        xs: "0",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="large"
        variant="contained"
        color="error"
        startIcon={<Delete />}
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<Add />}
        onClick={openAddHandler}
      >
        Add Member
      </Button>
    </Stack>
  );
  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
          
        }}
        sm={4}
      >
        <GroupList myGroups={SampleChats} chatId={chatId} />
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
        {groupName && (
          <>
            {groupNameHtml}
            <Typography>Members</Typography>
            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
              height={"50vh"}
              overflow={"auto"}
            >
              {SampleUsers.map((i) => (
                <UserItem
                  key={i._id}
                  user={i}
                  handler={removeMemberHandler}
                  isAdded
                  styling={{
                    boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                    padding: "1rem 2rem",
                    borderRadius: "1rem",
                  }}
                />
              ))}
            </Stack>
            {buttonGroup}
          </>
        )}
      </Grid>
      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog />
        </Suspense>
      )}
      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            deleteHandler={deleteHandler}
            open={confirmDeleteDialog}
            handleClose={closeConfirmDeleteHandler}
          />
        </Suspense>
      )}
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
        <GroupList
          w="50vh"
          myGroups={SampleChats}
          chatId={chatId}
        />
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => {
  return (
    <Stack
      width={w}
      sx={{
        backgroundImage: bgGradient,
        height:'100vh',
        overflow:'auto'
        
      }}
    >
      {myGroups.length > 0 ? (
        myGroups.map((group) => {
          return (
            <GroupListItem group={group} chatId={chatId} key={group._id} />
          );
        })
      ) : (
        <Typography textAlign={"center"} padding={"1rem"}>
          No Groups
        </Typography>
      )}
    </Stack>
  );
};
const GroupListItem = memo(({ group }) => {
  const { name, avatar, _id, chatId } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack
        direction={"row"}
        position="relative"
        spacing={"1rem"}
        alignItems={"center"}
      >
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Groups;
