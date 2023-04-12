import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useEffect, useState } from 'react';

import AccountCircle from '@mui/icons-material/AccountCircle';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { Card, CardContent, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';

import axios from 'axios';


function createData(CourtID, Date, Time, CourtType,Floor, Status) {
    return { CourtID, Date, Time, CourtType,Floor, Status };
}

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, '',4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, '',4.3),
//     createData('Eclair', 262, 16.0, 24, '',6.0),
//     createData('Cupcake', 305, 3.7, 67, '',4.3),
//     createData('Gingerbread', 356, 16.0, 49,'', 3.9),
// ];

function MyReservation() {

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const [reservationList, setreservationList] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClosee = () => {
        setOpen(false);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleOK = () => {
        window.location = '/Court';
    }

    const handleMyReservation = () => {
        window.location = '/MyReservation';
    }

    const handleVerify = () => {
        window.location = '/Verify';
    }

    const handlelogout = () => {
        window.location = '/';
    }

    const handleBack = () => {
        window.location = '/Home';
    }

    const handleDelete = () => {
        window.location = ''
    }

    const handleReserve = (event) => {
        
        event.preventDefault();
        fetch("http://localhost:5000/reserve", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                //console.error('success:', data);
                if (data.status == "ok") {
                    alert("update successfully");
                } else {
                    alert("update failed");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
      
        /*axios
          .post("http://localhost:5000/authen", null, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            const data = response.data;
            if (data.status === "ok") {
              // Authenticated successfully
            } else {
              alert("please login");
              localStorage.removeItem("token");
              window.location = "/";
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });*/
      
        const getUserID = localStorage.getItem("UserID");
        const jsonData = {
          UserID: getUserID,
        };
      
        axios
          .get("http://localhost:5000/reservations", {
            headers: {
              "Content-Type": "application/json",
            },
            params: jsonData,
          })
          .then((response) => {
            const data = response.data;
            setreservationList(data);
          })
          .catch((error) => console.log(error));
      }, []);
      

    // const AvailabilityList = () => {
    //     const [availabilities, setAvailabilities] = useState([]);
    //     const [order, setOrder] = useState("asc");
    //     const [toggleAllChecked, setToggleAllChecked] = useState(false);
      
    //     useEffect(() => {
    //         .get("http://localhost:5000/availabilities")
    //         .then((res) => {
    //           setAvailabilities(res.data);
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //     }, []);
      
    const [reservations, setReservations] = useState([]);
    const handleCancel = (reserveId) => {
        axios
        .put(`http://localhost:5000/UpdateReservations/${reserveId}`)
        .then((response) => {
            console.log(response.data);
            // Handle the response and update the UI as needed
        })
        .catch((error) => {
            console.error("Error:", error);
        });

      };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <ArrowBackIosIcon sx={{ mr: 1 }} onClick={handleBack}/>
                        <Typography
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'Segoe UI',
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                            }} variant="h6" >
                            Reservation Court
                        </Typography>

                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle display="flex" />
                        </IconButton>

                        <Menu
                            //กล่องสี่เหลี่ยมprofile
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
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
                            <MenuItem onClick={handleMyReservation}>
                                <ListItemIcon>
                                    <ArticleOutlinedIcon />
                                </ListItemIcon>
                                My Reservation
                            </MenuItem>
                            <MenuItem onClick={handleVerify}>
                                <ListItemIcon>
                                    <QrCodeScannerIcon />
                                </ListItemIcon>
                                Verify Reservation
                            </MenuItem>
                            <MenuItem onClick={handlelogout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>CourtID</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Time</TableCell>
                                <TableCell align="center">CourtType</TableCell>
                                <TableCell align="left">Floor</TableCell>
                                <TableCell align="left">Status</TableCell>
                                {/* <Button variant="outlined" startIcon={<DeleteIcon />}>cancel</Button> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reservationList.map((reservation) => (
                                <TableRow
                                    key={reservation.CourtID}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {reservation.CourtID}
                                    </TableCell>
                                    <TableCell align="center">{reservation.ReserveDate}</TableCell>
                                    <TableCell align="center">{reservation.TimeList}</TableCell>
                                    <TableCell align="center">{reservation.CourtType}</TableCell>
                                    <TableCell align="left">{reservation.Floor}</TableCell>
                                    <TableCell align="left">{reservation.ReserveStatus}</TableCell>
                                    <IconButton aria-label="delete" size="small">
                                        <DeleteIcon fontSize="small" onClick={() => handleCancel(reservation.ReserveID)} />
                                    </IconButton>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box >

    );
}

export default MyReservation;