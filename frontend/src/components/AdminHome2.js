import React,{useState, useEffect} from 'react';
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
import { Container, Grid } from '@mui/material';
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
import axios from "axios";

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

const handleUserDataManage = () => {
  window.location = '/UserDataManage';
}

const handlelogout = () => {
  window.location = '/';
}

const handleCourtManage = () => {
  window.location = '/AdminHome';
}

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

function AdminHome2() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const AvailabilityList = () => {
    const [availabilities, setAvailabilities] = useState([]);
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    axios
      .get("http://localhost:5000/availabilities")
      .then((res) => {
        setAvailabilities(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggleAvailabilityStatus = (id, status) => {
    const newStatus = status === 1 ? 0 : 1;
    axios
      .put(`http://localhost:5000/availabilities/${id}`, {
        Status: newStatus,
      })
      .then((res) => {
        // Update the availabilities array with the updated availability
        const updatedAvailabilities = availabilities.map((availability) =>
          availability.AvailabilityID === id
            ? { ...availability, Status: newStatus }
            : availability
        );
        setAvailabilities(updatedAvailabilities);
      })
      .catch((err) => {
        console.log(err);
      });
  };  

  const sortByAvailabilityId = () => {
    const sortedAvailabilities = [...availabilities].sort(
      (a, b) =>
        order === "asc"
          ? a.AvailabilityID - b.AvailabilityID
          : b.AvailabilityID - a.AvailabilityID
    );
    setOrder(order === "asc" ? "desc" : "asc");
    setAvailabilities(sortedAvailabilities);
  };

  return (
    <div>
      <h2>Availability List</h2>
      <button onClick={sortByAvailabilityId}>
        Sort by Availability ID ({order})
      </button>
      <table>
        <thead>
          <tr>
            <th>Availability ID</th>
            <th>Court Type</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {availabilities.map((availability) => (
            <tr key={availability.AvailabilityID}>
              <td>{availability.AvailabilityID}</td>
              <td>{availability.CourtType}</td>
              <td>{availability.dates}</td>
              <td>{availability.startTime}</td>
              <td>{availability.endTime}</td>
              <td>
                <label>
                <input
                  type="checkbox"
                  checked={availability.Status === 1}
                  onChange={() =>
                    toggleAvailabilityStatus(
                      availability.AvailabilityID,
                      availability.Status
                    )
                  }
                />
                  {availability.Status === 1 ? "Available" : "Unavailable"}
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  };

  return (
    <Box sx={{ display: "flex" }}>
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
                    <MenuItem onClick={handlelogout}>
                        <ListItemIcon>
                            <Logout sx={{mr:4}}/>
                        </ListItemIcon>
                        Log Out
                    </MenuItem>
                
            </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: { sm: 0 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <DrawerHeader />
        <Container>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Court Availability" />
            <Tab label="User List" />
            <Tab label="Reservation List" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <AvailabilityList />
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* User list component */}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {/* Reservation list component */}
          </TabPanel>
        </Container>
      </Box>
    </Box>
  );
}

export default AdminHome2;

