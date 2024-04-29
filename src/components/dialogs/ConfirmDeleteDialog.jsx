/* eslint-disable react/prop-types */
import React from "react";
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";

const ConfirmDeleteDialog = ({ open, handleClose, deleteHandler }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}> Cancel</Button>
        <Button onClick={deleteHandler} color="error"> Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
