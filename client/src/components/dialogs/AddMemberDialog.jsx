import React, { useState } from "react";
import { Dialog, Stack, DialogTitle, Typography, Button } from "@mui/material";
import { SampleUsers } from "../constants/sampleData";
import UserItem from "../shared/UserItem";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const [members, setMembers] = useState(SampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((current) => current !== id)
        : [...prev, id]
    );
  };

  const closeHandler = () => {
    setSelectedMembers([]);
    setMembers([]);
  };
  const addMemberSubmitHandler = () => {
    closeHandler();
  };
  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {members.length > 0 ? (
            members.map((user) => {
              return (
                <UserItem
                  user={user}
                  key={user._id}
                  handler={selectMemberHandler}
                  isAdded={selectedMembers.includes(user._id)}
                />
              );
            })
          ) : (
            <Typography textAlign={'center'}>No Friends</Typography>
          )}
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            onClick={addMemberSubmitHandler}
            variant="contained"
            disabled={isLoadingAddMember}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
