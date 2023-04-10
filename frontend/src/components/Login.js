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

//สร้างthemeควบคุมstyleแบบglobal
const theme = createTheme();

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      UserID: data.get('UserID'),
      password: data.get('password')
    }
    fetch('http://localhost:5000/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
      .then(response => response.json())
      .then(data => {
        //console.error('success:', data);
        if(data.status == 'ok'){
          localStorage.setItem('token', data.token)
          window.location = '/Home';
          alert('login successfully')
        } else {
          alert('login failed')
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  };

  const HandleLogin = () => {
        window.location = '/Home';
    }
    

  

return (
  <div className="App container">
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* <form action="/login" method="post"> */}

            <TextField
              margin="normal"
              required
              fullWidth
              id="UserID"
              label="UserID"
              name="UserID"
              autoComplete="UserID"
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
              onClick={HandleLogin}
            >
              LOGIN
            </Button>

          </Box>
          {/* </form> */}
        </Box>
      </Container>
    </ThemeProvider>

  </div>
);
}

export default Login;
