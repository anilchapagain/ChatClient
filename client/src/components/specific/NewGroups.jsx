import React, { useState } from "react";
import {
  DialogTitle,
  Dialog,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { SampleUsers } from "../constants/sampleData";
import UserItem from "../shared/UserItem";
import { TextFields } from "@mui/icons-material";
import { useInputValidation } from "6pp";

const NewGroups = () => {
  const [memebrs, setMembers] = useState([SampleUsers]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [users, setUsers] = useState(SampleUsers);
  let isLoadingSendFriendRequest = false;

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((current) => current !== id)
        : [...prev, id]
    );
  };
  console.log(selectedMembers);
  const submitHandler = () => {};
  const groupName = useInputValidation("");
  const closeHandler = () => {};
  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>
        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography>Members</Typography>
        <Stack>
          {users?.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={selectMemberHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
              isAdded={selectedMembers.includes(i._id)}
            />
          ))}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button variant="text" color="error" size="large">
            Cancel
          </Button>
          <Button variant="contained" size="large" onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroups;
