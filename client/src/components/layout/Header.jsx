import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { lazy, useState } from "react";
import { navy, orange, purple, purpleLight } from "../constants/Color";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Add,
  Group,
  Logout,
  Menu,
  Notifications,
  Search,
} from "@mui/icons-material";
import { Suspense } from "react";
import { server } from "../constants/config";

const SearchDialog = lazy(() => import("../specific/Search"));
const NewGroups = lazy(() => import("../specific/NewGroups"));
const Notification = lazy(() => import("../specific/Notification"));
// const [isSearch,setIsSearch]=import { toast, Toast } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/misc";
import { resetNotificationCount } from "../../redux/reducers/chat";

// const [isSearch,setIsSearch]=useState(false);
// const [isSearch,setIsSearch]=useState(false);


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
// const [isNewGroup, setIsNewGroup] = useState(false);
  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );
  const { notificationCount } = useSelector((state) => state.chat);

  const handleMobile = () => {
    dispatch(setIsMobile(true));
  };
  const openSearchDialog = () => {
    dispatch(setIsSearch(true));
  };
  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };
  // const history = useHistory();
  const navigateToGroup = () => {
    console.log("open Group");
    return navigate("/groups");
    // history.push("/groups");
  };

  const logoutHandler = async (e) => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "some thing went wrong");
    }
  };
  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  };

  // const [isManageGroup, setIsManageGroups] = useState(false);

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: navy,
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
                onClick={openSearchDialog}
                icon={<Search />}
              />

              <IconBtn
                title={"Add Group"}
                onClick={openNewGroup}
                icon={<Add />}
              />
              <IconBtn
                title={"Manage Group"}
                onClick={navigateToGroup}
                icon={<Group />}
              />
              <IconBtn
                title={"Notification"}
                onClick={openNotification}
                icon={<Notifications />}
                value={notificationCount}
              />
              <IconBtn
                title={"Logout"}
                onClick={logoutHandler}
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
const IconBtn = ({ title, onClick, icon, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};
export default Header;
