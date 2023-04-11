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
import ListItemIcon from '@mui/material/ListItemIcon';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import Logout from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
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

//ส่วนtable
const Date = [
    { label: 'วันที่ 1' },
    { label: 'วันที่ 2' },
    { label: 'วันที่ 3' },
    { label: 'วันที่ 4' },
    { label: 'วันที่ 5' },
    { label: 'วันที่ 6' },
    { label: 'วันที่ 7' }
];

//switch เปิดปิด  
const label = { inputProps: { 'aria-label': 'Switch demo' } };

function AdminHome() {
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
    
    const AvailabilityList = () => {
        const [availabilities, setAvailabilities] = useState([]);
        const [order, setOrder] = useState("asc");
        const [toggleAllChecked, setToggleAllChecked] = useState(false);
      
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
      
        const toggleAllAvailabilityStatus = () => {
          const newStatus = toggleAllChecked ? 0 : 1;
          setToggleAllChecked(!toggleAllChecked);
      
          Promise.all(
            availabilities.map((availability) =>
              axios.put(`http://localhost:5000/availabilities/${availability.AvailabilityID}`, {
                Status: newStatus,
              })
            )
          )
            .then(() => {
              const updatedAvailabilities = availabilities.map((availability) => ({
                ...availability,
                Status: newStatus,
              }));
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
        <>
          <Button onClick={sortByAvailabilityId} variant="contained">
            Sort by Availability ID ({order})
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <FormControlLabel
            control={
              <Switch 
                checked={toggleAllChecked}
                onChange={toggleAllAvailabilityStatus}
              />
            }
            label="Toggle All"
          />
          <TableContainer component={Paper} sx={{ width: "100%", height: 550 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Availability ID</TableCell>
                  <TableCell>Court Type</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>TimeList</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {availabilities.map((availability) => (
                  <TableRow
                    key={availability.AvailabilityID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {availability.AvailabilityID}
                    </TableCell>
                    <TableCell>{availability.CourtType}</TableCell>
                    <TableCell>{availability.dates}</TableCell>
                    <TableCell>{availability.TimeList}</TableCell>
                    <TableCell sx={{ width: 200 }}>
                      <Switch
                        checked={availability.Status > 0 ? true : false}
                        onChange={() =>
                          toggleAvailabilityStatus(
                            availability.AvailabilityID,
                            availability.Status
                          )
                        }
                      />
                      {availability.Status > 0 ? "Available" : "Unavailable"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      );
    };
      
      const CourtAvailabilityList = ({ courtId }) => {
        const [availabilities, setAvailabilities] = useState([]);
        const [order, setOrder] = useState("asc");
        const [toggleAllChecked, setToggleAllChecked] = useState(false);
      
        useEffect(() => {
          axios
            .get(`http://localhost:5000/availabilities/${courtId}`)
            .then((res) => {
              setAvailabilities(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }, [courtId]);
      
        const toggleAvailabilityStatus = (id, status) => {
            const newStatus = status === 1 ? 0 : 1;
            axios
              .put(`http://localhost:5000/availabilities/${id}`, {
                Status: newStatus,
              })
              .then((res) => {
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
        
          const toggleAllAvailabilityStatus = () => {
            const newStatus = toggleAllChecked ? '0' : 1;
            setToggleAllChecked(!toggleAllChecked);
        
            Promise.all(
              availabilities.map((availability) =>
                axios.put(`http://localhost:5000/availabilities/${availability.AvailabilityID}`, {
                  Status: newStatus,
                })
              )
            )
              .then(() => {
                const updatedAvailabilities = availabilities.map((availability) => ({
                  ...availability,
                  Status: newStatus,
                }));
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
          <>
            <Button onClick={sortByAvailabilityId} variant="contained">
              Sort by Availability ID ({order})
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <FormControlLabel
              control={
                <Switch 
                  checked={toggleAllChecked}
                  onChange={toggleAllAvailabilityStatus}
                />
              }
              label="Toggle All"
            />
            <TableContainer component={Paper} sx={{ width: "100%", height: 550 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Availability ID</TableCell>
                    <TableCell>Court Type</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>TimeList</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {availabilities.map((availability) => (
                    <TableRow
                      key={availability.AvailabilityID}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {availability.AvailabilityID}
                      </TableCell>
                      <TableCell>{availability.CourtType}</TableCell>
                      <TableCell>{availability.dates}</TableCell>
                      <TableCell>{availability.TimeList}</TableCell>
                      <TableCell sx={{ width: 200 }}>
                        <Switch
                          checked={availability.Status > 0 ? true : false}
                          onChange={() =>
                            toggleAvailabilityStatus(
                              availability.AvailabilityID,
                              availability.Status
                            )
                          }
                        />
                        {availability.Status > 0 ? "Available" : "Unavailable"}
                      </TableCell>
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
                        <AvailabilityList />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <CourtAvailabilityList courtId={1} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <CourtAvailabilityList courtId={2} />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <CourtAvailabilityList courtId={3} />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <CourtAvailabilityList courtId={4} />
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        <CourtAvailabilityList courtId={5} />
                    </TabPanel>
                    <TabPanel value={value} index={6}>
                        <CourtAvailabilityList courtId={6} />
                    </TabPanel>
                    <TabPanel value={value} index={7}>
                        <CourtAvailabilityList courtId={7} />
                    </TabPanel>
                    <TabPanel value={value} index={8}>
                        <CourtAvailabilityList courtId={8} />
                    </TabPanel>
                    <TabPanel value={value} index={9}>
                        <CourtAvailabilityList courtId={9} />
                    </TabPanel>
                    <TabPanel value={value} index={10}>
                        <CourtAvailabilityList courtId={10} />
                    </TabPanel>
                    <TabPanel value={value} index={11}>
                        <CourtAvailabilityList courtId={11} />
                    </TabPanel>
                </Box>

            </Box>


        </Box>
    );
}

export default AdminHome;