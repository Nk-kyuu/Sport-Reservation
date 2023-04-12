import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import Logout from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Container, Grid, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

//ส่วนของappbar
const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);
//

//tabเลือกcourt
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
//

function AdminReservation() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleUserDataManage = () => {
        window.location = '/UserDataManage';
    }

    const handleReservation = () => {
        window.location = '/AdminReservation';
    }

    const handlelogout = () => {
        window.location = '/';
    }

    const handleCourtManage = () => {
        window.location = '/AdminHome';
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const ReservationList = () => {
        const [reservations, setReservations] = useState([]);
        const [order, setOrder] = useState("asc");
      
        useEffect(() => {
          axios
            .get(`http://localhost:5000/reservations`)
            .then((res) => {
              setReservations(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }, []);
      
        const sortByReserveId = () => {
          const sortedReservations = [...reservations].sort(
            (a, b) =>
              order === "asc"
                ? a.ReserveID - b.ReserveID
                : b.ReserveID - a.ReserveID
          );
          setOrder(order === "asc" ? "desc" : "asc");
          setReservations(sortedReservations);
        };

        const handleDelete = (reserveId) => {
            axios
              .delete(`http://localhost:5000/DeleteReservations/${reserveId}`)
              .then((res) => {
                console.log(res.data.message);
                setReservations(reservations.filter((reservation) => reservation.ReserveID !== reserveId));
              })
              .catch((err) => {
                console.error(err);
              });
          };
      
        return (
          <>
            <Button onClick={sortByReserveId} variant="contained">
              Sort by Reservation ID ({order})
            </Button>
      
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell>ReserveID</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="center">CourtType</TableCell>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="left">Deletion</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reservations.map((row) => (
                    <TableRow
                        key={row.ReserveID}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                        {row.ReserveID}
                        </TableCell>
                        <TableCell align="center">{row.ReserveDate}</TableCell>
                        <TableCell align="center">{row.TimeList}</TableCell>
                        <TableCell align="center">{row.CourtType}</TableCell>
                        <TableCell align="left">{row.ReserveStatus}</TableCell>
                        <IconButton aria-label="delete" size="small">
                        <DeleteIcon fontSize="small" onClick={() => handleDelete(row.ReserveID)} />
                        </IconButton>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
          </>
        );
      };

      const CourtReservationList = ({ courtId }) => {
        const [reservations, setReservations] = useState([]);
        const [order, setOrder] = useState("asc");
      
        useEffect(() => {
            axios
              .get(`http://localhost:5000/reservationsByID?courtID=${courtId}`)
              .then((res) => {
                setReservations(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }, [courtId]);
      
        const sortByReserveId = () => {
          const sortedReservations = [...reservations].sort(
            (a, b) =>
              order === "asc"
                ? a.ReserveID - b.ReserveID
                : b.ReserveID - a.ReserveID
          );
          setOrder(order === "asc" ? "desc" : "asc");
          setReservations(sortedReservations);
        };
      
        const filteredReservations = reservations.filter(
          (reservation) => reservation.CourtID === courtId
        );

        const handleDelete = (reserveId) => {
            axios
              .delete(`http://localhost:5000/DeleteReservations/${reserveId}`)
              .then((res) => {
                console.log(res.data.message);
                setReservations(reservations.filter((reservation) => reservation.ReserveID !== reserveId));
              })
              .catch((err) => {
                console.error(err);
              });
          };
      
        return (
          <>
            <Button onClick={sortByReserveId} variant="contained">
              Sort by Reservation ID ({order})
            </Button>
      
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ReserveID</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="center">CourtType</TableCell>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="left">Deletion</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredReservations.map((row) => (
                    <TableRow
                      key={row.ReserveID}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.ReserveID}
                      </TableCell>
                      <TableCell align="center">{row.ReserveDate}</TableCell>
                      <TableCell align="center">{row.TimeList}</TableCell>
                      <TableCell align="center">{row.CourtType}</TableCell>
                      <TableCell align="left">{row.ReserveStatus}</TableCell>
                      <IconButton aria-label="delete" size="small">
                      <DeleteIcon fontSize="small" onClick={() => handleDelete(row.ReserveID)} />
                      </IconButton>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        );
      };
      

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ bgcolor: '#4caf50' }} open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" sx={{ fontFamily: 'Segoe UI', fontWeight: 700 }} noWrap component="div">
                        Admin Reservation Court
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                
                    <MenuItem onClick={handleCourtManage}>
                        <ListItemIcon>
                            <ArticleOutlinedIcon sx={{mr:4}}/>
                        </ListItemIcon>
                        Court Manage
                    </MenuItem>
                    <MenuItem onClick={handleUserDataManage}>
                        <ListItemIcon>
                            <ManageAccountsIcon sx={{mr:4}}/>
                        </ListItemIcon>
                        User Data Manage
                    </MenuItem>
                    <MenuItem onClick={handleReservation}>
                        <ListItemIcon>
                            <TextSnippetIcon sx={{mr:4}}/>
                        </ListItemIcon>
                        Reservation
                    </MenuItem>
                    <MenuItem onClick={handlelogout}>
                        <ListItemIcon>
                            <Logout sx={{mr:4}}/>
                        </ListItemIcon>
                        Log Out
                    </MenuItem>
                
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
                <DrawerHeader />
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable">
                        <Tab label="All" {...a11yProps(0)} />
                            <Tab label="Basketball Court" {...a11yProps(1)} />
                            <Tab label="Tennis Court" {...a11yProps(2)} />
                            <Tab label="Badminton Court1" {...a11yProps(3)} />
                            <Tab label="Badminton Court2" {...a11yProps(4)} />
                            <Tab label="Badminton Court3" {...a11yProps(5)} />
                            <Tab label="Badminton Court4" {...a11yProps(6)} />
                            <Tab label="Futsal Court1" {...a11yProps(7)} />
                            <Tab label="Futsal Court2" {...a11yProps(8)} />
                            <Tab label="Boxing Stadium" {...a11yProps(9)} />
                            <Tab label="Judo Court" {...a11yProps(10)} />
                            <Tab label="Volleyball Court" {...a11yProps(11)} />
                        </Tabs>
                    </Box>

                    <TabPanel value={value} index={0}>
                        <ReservationList />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <CourtReservationList courtId={1} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <CourtReservationList courtId={2} />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <CourtReservationList courtId={3} />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <CourtReservationList courtId={4} />
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        <CourtReservationList courtId={5} />
                    </TabPanel>
                    <TabPanel value={value} index={6}>
                        <CourtReservationList courtId={6} />
                    </TabPanel>
                    <TabPanel value={value} index={7}>
                        <CourtReservationList courtId={7} />
                    </TabPanel>
                    <TabPanel value={value} index={8}>
                        <CourtReservationList courtId={8} />
                    </TabPanel>
                    <TabPanel value={value} index={9}>
                        <CourtReservationList courtId={9} />
                    </TabPanel>
                    <TabPanel value={value} index={10}>
                        <CourtReservationList courtId={10} />
                    </TabPanel>
                    <TabPanel value={value} index={11}>
                        <CourtReservationList courtId={11} />
                    </TabPanel>
                </Box>

            </Box>


        </Box>
    );
}

export default AdminReservation;