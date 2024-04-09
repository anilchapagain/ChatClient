import React from 'react'
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {  useInputValidation} from "6pp"
import { bgGradient } from '../../components/constants/Color';
import { Navigate } from 'react-router-dom';

const isAdmin = true;
const AdminLogin = () => {
     const secretkey = useInputValidation("");

     const handleLogin = (e) => {
       e.preventDefault();
       console.log("login submit");
     };
     

     if (isAdmin) return <Navigate to = '/admin/dashboard' />;
  return (
    <div
      style={{
        backgroundImage: bgGradient,
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          
            <>
              <Typography variant="h5">Admin Login</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleLogin}
              >
                
                <TextField
                  required
                  fullWidth
                  type="password"
                  label="Secret Key"
                  margin="normal"
                  variant="outlined"
                  value={secretkey.value}
                  onChange={secretkey.changeHandler}
                />

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Login
                </Button>
                
              </form>
            </>
          
        </Paper>
      </Container>
    </div>
  );
}

export default AdminLogin