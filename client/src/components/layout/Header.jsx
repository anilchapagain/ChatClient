import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { lazy, useState } from "react";
import { orange } from "../constants/Color";
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
import { setIsMobile, setIsNotification, setIsSearch } from "../../redux/reducers/misc";

// const [isSearch,setIsSearch]=useState(false);
// const [isSearch,setIsSearch]=useState(false);
// const [isSearch, setIsSearch] = useState(false);

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );

  const handleMobile = () => {
    dispatch(setIsMobile(true));
  };
  const openSearchDialog = () => {
    dispatch(setIsSearch(true));
  };
  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
    console.log("open add dialog");
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
  };

  // const [isManageGroup, setIsManageGroups] = useState(false);
  
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
