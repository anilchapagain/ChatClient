import React, { useState } from "react";
import { Stack, Dialog, DialogTitle, TextField, InputAdornment, List} from "@mui/material";
import { useInputValidation } from "6pp";
import { Search } from '@mui/icons-material';
import UserItem from "../shared/UserItem";
import { SampleUsers } from "../constants/sampleData";
const SearchDialog = () => {
  
  const search = useInputValidation("");
  let isLoadingSendFriendRequest = false;
  const [users, setUsers] = useState(SampleUsers)
  const addFriendHandler  = (user) => {
    console.log(user)
  };


  return (
    <Dialog open>
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
            startAdornment:(
              <InputAdornment position='start'>
<Search />
              </InputAdornment>
            )
          }}
        />

        <List>
{
  users?.map((i) => (
   <UserItem  user={i} key={i._id} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriendRequest} />
  ))

}
        </List>
      </Stack>
    </Dialog>
  );
};

export default SearchDialog;
