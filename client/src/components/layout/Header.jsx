import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { lazy, useState } from "react";
import { orange } from "../constants/Color";
import { useNavigate } from "react-router-dom";

import {
  Add,
  Group,
  Logout,
  Menu,
  Notifications,
  Search,
} from "@mui/icons-material";
import { Suspense } from "react";


const SearchDialog = lazy(() => import("../specific/Search"));
const NewGroups = lazy(() => import("../specific/NewGroups"));
const Notification = lazy(() => import("../specific/Notification"));
// const [isSearch,setIsSearch]=useState(false);
// const [isSearch,setIsSearch]=useState(false);
// const [isSearch,setIsSearch]=useState(false);
// const [isSearch, setIsSearch] = useState(false);

const Header = () => {
  const navigate = useNavigate();
  const handleMobile = () => {
    console.log("handel menu");
  };
  const openSearchDialog = () => {
    setIsSearch((prev) => !prev);
    console.log("open searh dialog");
  };
  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
    console.log("open add dialog");
  };
  // const history = useHistory();
  const navigateToGroup = () => {
    console.log("open Group");
  return  navigate('/groups');
    // history.push("/groups");
    
  };
  const logoutHandler = () => {
    console.log("open Group");
  };
  const openNotification = () => {
    setIsNotification((prev) => !prev);
    console.log("open Notification");
  };
  const [isSearch, setIsSearch] = useState(false);
  // const [isManageGroup, setIsManageGroups] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: orange,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              Chat App
            </Typography>

            <Box
              sx={{
                display: {
                  xs: "block",
                  sm: "none",
                },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <Menu />
              </IconButton>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
              }}
            />
            <Box>
              <IconBtn
                title={"Search"}
                click={openSearchDialog}
                icon={<Search />}
              />

              <IconBtn
                title={"Add Group"}
                click={openNewGroup}
                icon={<Add />}
              />
              <IconBtn
                title={"Manage Group"}
                click={navigateToGroup}
                icon={<Group />}
              />
              <IconBtn
                title={"Notification"}
                click={openNotification}
                icon={<Notifications />}
              />
              <IconBtn
                title={"Logout"}
                click={logoutHandler}
                icon={<Logout />}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroups />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <Notification />
        </Suspense>
      )}
      {/* {isManageGroup && history.push('/groups')} */}
    </>
  );
};
const IconBtn = ({ title, click, icon }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={click}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};
export default Header;
