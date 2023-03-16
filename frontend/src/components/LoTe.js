import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { Button, Container} from "react-bootstrap";
import Axios from "axios";

// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';


function LoTe() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     fetch('/login', {
//       method: 'POST',
//       header: {
//         'Comtent-Type': 'application/json',
//       },
//       //body: JSON.stringify(jsonData),
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Successs:', data);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       })
//   };



return (
  <div classname="App container">

      <Container>
        
          <form action = "/login" method="post">

            <Form

              id="username"
              label="Username"
              name="UserID"
              autoComplete="username"
              autoFocus
            />
            <Form

              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"

              variant="contained"
              sx={{ mt: 2 }}
            >
              LOGIN
            </Button>

          </form>

      </Container>

  </div>
);
}

export default LoTe;