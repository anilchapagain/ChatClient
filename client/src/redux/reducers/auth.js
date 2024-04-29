import { createSlice } from "@reduxjs/toolkit";
import { adminLogin, adminLogout, getAdminDetails } from "../thunks/admin";
import Toast from "react-hot-toast";

const initialState = {
  user: null,
  isAdmin: false,
  loader: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExists: (state, action) => {
      state.user = action.payload;
      state.loader = false;
    },
    userNotExists: (state) => {
      state.user = null;
      state.loader = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminLogin.fulfilled, (state, action) => {
      state.isAdmin = true;
      Toast.success(action.payload);
    });
    builder.addCase(adminLogin.rejected, (state, action) => {
      state.isAdmin = false;
      Toast.error(action.error.message);
    });
    builder.addCase(getAdminDetails.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAdmin = true;
      }
      else{
        state.isAdmin=false
      }
    });
    builder.addCase(getAdminDetails.rejected, (state, action) => {
      state.isAdmin = false;
    });
     builder.addCase(adminLogout.fulfilled, (state, action) => {
       state.isAdmin = false;
       Toast.success(action.payload)
     });
      builder.addCase(adminLogout.rejected, (state, action) => {
        state.isAdmin = true;
       Toast.success(action.error.message);

      });
  },
});

export default authSlice;
export const { userExists, userNotExists } = authSlice.actions;
