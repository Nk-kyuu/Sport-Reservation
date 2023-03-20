import { useEffect, useState } from "react";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid';

//add
const court = [
  { label: 'Basketball Court1' },
  { label: 'Basketball Court2' },
  { label: 'Badminton Court1' },
  { label: 'Badminton Court2' },
  { label: 'Badminton Court3' },
  { label: 'Volleyball Court1' },
  { label: 'Volleyball Court2' },
  { label: 'Football Court' }
]

const timeSlots = [
  { label: '15.00 - 16.00' },
  { label: '16.00 - 17.00' },
  { label: '17.00 - 18.00' },
  { label: '18.00 - 19.00' },
  { label: '19.00 - 20.00' },
  { label: '20.00 - 21.00' },
  { label: '21.00 - 22.00' }
]
//

function Home() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/authen", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //console.error('success:', data);
        if (data.status == "ok") {
          //alert('authen successfully')
        } else {
          alert("please login");
          localStorage.removeItem("token");
          window.location = "/";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location = "/";
  };

  //add
  const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
  //

  return (
      <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Reservation Court
                    </Typography>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu 
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}                       
                        >
                            <MenuItem sx={{ width: 250 }} onClick={handleClose}>My Reservation</MenuItem>
                            <MenuItem sx={{ width: 250 }} onClick={handleClose}>Verify Reservation</MenuItem>
                            <MenuItem sx={{ width: 250 }} onClick={handleClose}>Log out</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="xs">
                < Box sx={{ mt: 10, mb: 10 }}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={court}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Choose Court" />}
                    />
                </Box>
                <Box sx={{ width: 300 }}>
                    <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker sx={{ width: 300 }} label="Date" />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid>
                </Box>
                < Box sx={{ mt: 10, mb: 10 }}>
                    <Grid item xs={6}>
                        <Autocomplete
                            sx={{ width: 300 }}
                            id="disabled-options-demo"
                            options={timeSlots}
                            //ส่วนdisableเวลาที่มีคนจองเวลานั้นไปแล้วคนอื่นก็จะเลือกเวลานั้นไม่ได้ ยากไปไหมตรงนี้ส่วนของbackend ไม่เอาส่วนนี้ตัดได้นะ
                            getOptionDisabled={(option) =>
                                option === timeSlots[0] || option === timeSlots[2]
                            }
                            renderInput={(params) => <TextField {...params} label="Time" />}
                        />
                    </Grid>
                </Box>
            </Container>
        </Box> 
  );
}

export default Home;
