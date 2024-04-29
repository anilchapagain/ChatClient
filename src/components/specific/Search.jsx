import React, { useEffect, useState } from "react";
import {
  Stack,
  Dialog,
  DialogTitle,
  TextField,
  InputAdornment,
  List,
} from "@mui/material";
import { useInputValidation } from "6pp";
import { Search } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { useSelector, useDispatch } from "react-redux";
import { setIsSearch } from "../../redux/reducers/misc";

import { toast } from 'react-hot-toast';
 import {
   useLazySearchUserQuery,
   useSendFriendRequestMutation,
 } from "../../redux/api/api";
import { useAsyncMutation } from "../../hooks/hook";
const SearchDialog = () => {
  const dispatch = useDispatch();
  const { isSearch } = useSelector((state) => state.misc);
  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest, isLoadingSendFriendRequest,] = useAsyncMutation(
    useSendFriendRequestMutation
  );
  const search = useInputValidation("");
  const [users, setUsers] = useState([]);
  const addFriendHandler = async (id) => {
   await sendFriendRequest("sending friend request",{userId: id});
  };
  const searchClose = () => dispatch(setIsSearch(false));

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => {
          return setUsers(data.users);
        })
        .catch((e) => console.log(e));
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

  return (
    <Dialog open={isSearch} onClose={searchClose}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>

        <TextField
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          label=""
          id="name"
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users?.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default SearchDialog;
