import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function Login() {
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   fetch('/login', {
  //     method: 'POST',
  //     header: {
  //       'Comtent-Type': 'application/json',
  //     },
  //     //body: JSON.stringify(jsonData),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('Successs:', data);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     })
  // };



return (
  <div classname="App container">
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: '#1565c0' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> */}
          <form action="/login" method="POST">

            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="UserID"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
            >
              LOGIN
            </Button>

          {/* </Box> */}
          </form>
        </Box>
      </Container>
    </ThemeProvider>

  </div>
);
}

export default Login;
