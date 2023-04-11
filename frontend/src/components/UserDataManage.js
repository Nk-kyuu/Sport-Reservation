import React,{useState, useEffect} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
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
import { Button, Container, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from "axios";
import Switch from '@mui/material/Switch';
import PropTypes from 'prop-types';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";



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

//switch เปิดปิด  
const label = { inputProps: { 'aria-label': 'Switch demo' } };

function UserDataManage() {
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
    };
  
    const handlelogout = () => {
      window.location = '/';
    };
  
    const handleCourtManage = () => {
      window.location = '/AdminHome';
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
  
    const [UserID, setId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [privilegee, setprivilege] = useState("");
    const [message, setMessage] = useState("");
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.put(`http://localhost:5000/users/${UserID}`, {
          Password: password,
          first_name: firstName,
          last_name: lastName,
          email: email,
          privilegee: privilegee,
        });
        setMessage(response.data.message);
        setId("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setprivilege("");
      } catch (error) {
        setMessage(`Error updating user: ${error.message}`);
      }
    };
  
    const AllUsers = () => {
      const [users, setUsers] = useState([]);

      useEffect(() => {
        axios
          .get("http://localhost:5000/users")
          .then((res) => {
            setUsers(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

      return (
        <Container sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <TableContainer component={Paper} sx={{ width: "100%", height: 550 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Privilege</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow
                        key={user.UserID}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {user.UserID}
                        </TableCell>
                        <TableCell>{user.Password}</TableCell>
                        <TableCell>{user.first_name}</TableCell>
                        <TableCell>{user.last_name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.privilegee}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Container>

      );
    };

    const SearchByID = () => {
      const [users, setUsers] = useState([]);
      const [searchValue, setSearchValue] = useState("");
      const [selectedUser, setSelectedUser] = useState(null);

      const handleSearch = () => {
        if (searchValue.trim() !== "") {
          axios
            .get(`http://localhost:5000/users/${searchValue}`)
            .then((res) => {
              setSelectedUser(res.data);
            })
            .catch((err) => {
              console.log(err);
              setSelectedUser(null);
            });
        } else {
          setSelectedUser(null);
        }
      };

      useEffect(() => {
        axios
          .get("http://localhost:5000/users/${searchValue}")
          .then((res) => {
            setUsers(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

      return (
        <Container sx={{ mt: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
            <div>
              <TextField  
                label="Enter User ID"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Button onClick={handleSearch} sx={{ width: 100, height: 55}} color="inherit" variant="contained">Search</Button>
            </div>
              {selectedUser && (
                <TableContainer component={Paper} sx={{ width: 1100, height: 125, mt: 3 }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Privilege</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        key={selectedUser.UserID}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {selectedUser.UserID}
                        </TableCell>
                        <TableCell>{selectedUser.Password}</TableCell>
                        <TableCell>{selectedUser.email}</TableCell>
                        <TableCell>{selectedUser.first_name}</TableCell>
                        <TableCell>{selectedUser.last_name}</TableCell>
                        <TableCell>{selectedUser.privilegee}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Grid>
          </Grid>
        </Container>
      );
    
    };

    const UpdateUserByID = () => {
      const [UserID, setId] = useState("");
      const [password, setPassword] = useState("");
      const [firstName, setFirstName] = useState("");
      const [lastName, setLastName] = useState("");
      const [email, setEmail] = useState("");
      const [privilegee, setprivilege] = useState("");
      const [message, setMessage] = useState("");

      const handleSubmit = async (event) => {
        event.preventDefault();

        try {
          const response = await axios.put(`http://localhost:5000/userUpdate/${UserID}`, {
            Password: password,
            first_name: firstName,
            last_name: lastName,
            email: email,
            privilegee: privilegee,
          });
          setMessage(response.data.message);
          setId("");
          setPassword("");
          setFirstName("");
          setLastName("");
          setEmail("");
          setprivilege("");
        } catch (error) {
          setMessage(`Error updating user: ${error.message}`);
        }
      };

      return (
        <Container maxWidth="xs">
          <Typography paragraph variant="h4" sx={{ fontFamily: '-apple-system ', fontWeight: 700 ,mt:4}}>
            Edit User Information
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                '& .MuiTextField-root': { width: '30ch' },    
              }}
            >
              <TextField sx={{ mt: 4 }} label={'User ID'} id="UserID" value={UserID} onChange={(event) => setId(event.target.value)} />
              <TextField sx={{ mt: 5 }} label={'First Name'} id="firstname" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
              <TextField sx={{ mt: 5 }} label={'Last Name'} id="lastname" value={lastName} onChange={(event) => setLastName(event.target.value)} />
              <TextField sx={{ mt: 5 }} label={'Email'} id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              <FormControl sx={{ mt: 5, minWidth: 120 }}>
                  <InputLabel id="privilege-label">privilege</InputLabel>
                  <Select
                      labelId="privilege-label"
                      id="privilegee"
                      value={privilegee}
                      label="privilegee"
                      onChange={(event) => setprivilege(event.target.value)}
                  >
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="User">User</MenuItem>
                  </Select>
              </FormControl>
              <Button type="submit" sx={{ mt: 5, width: 100, height: 45 }} variant="contained" color="inherit">
                  Confirm
              </Button>
            </Box>
          </form>
        </Container>
      );
    };

    const AddUser = () => {
      const [userID, setUserID] = useState("");
      const [password, setPassword] = useState("");
      const [firstName, setFirstName] = useState("");
      const [lastName, setLastName] = useState("");
      const [email, setEmail] = useState("");
      const [privilegee, setPrivilegee] = useState("");

      const handleSubmit = (event) => {
        event.preventDefault();

        const newUser = {
          UserID: userID,
          Password: password,
          first_name: firstName,
          last_name: lastName,
          email: email,
          privilegee: privilegee,
        };

        axios.post("http://localhost:5000/adduser", newUser,{ timeout: 10000 }).then((res) => {
          console.log(res.data);
        });
      };

      return (
        <Container maxWidth="xs">
          <Typography paragraph variant="h4" sx={{ fontFamily: '-apple-system ', fontWeight: 700, mt: 4 }}>
            Edit User Information
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                '& .MuiTextField-root': { width: '30ch' },
              }}
            >
              <TextField sx={{ mt: 4 }} label={'User ID'} id="userID" value={userID} onChange={(event) => setUserID(event.target.value)} />
              <TextField sx={{ mt: 5 }} label={'Password'} type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
              <TextField sx={{ mt: 5 }} label={'First Name'} id="firstName" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
              <TextField sx={{ mt: 5 }} label={'Last Name'} id="lastName" value={lastName} onChange={(event) => setLastName(event.target.value)} />
              <TextField sx={{ mt: 5 }} label={'Email'} id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              <FormControl sx={{ mt: 5, minWidth: 120 }}>
                <InputLabel id="privilege-label">Privilege</InputLabel>
                <Select
                  labelId="privilege-label"
                  id="privilegee"
                  value={privilegee}
                  label="privilegee"
                  onChange={(event) => setPrivilegee(event.target.value)}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                </Select>
              </FormControl>
              <Button type="submit" sx={{ mt: 5, width: 100, height: 45 }} variant="contained" color="inherit">
                Confirm
              </Button>
            </Box>
          </form>
        </Container>

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
          <List>
            <ListItem onClick={handleCourtManage}>
              <ListItemIcon>
                <ArticleOutlinedIcon />
              </ListItemIcon>
              Court Manage
            </ListItem>
            <ListItem onClick={handleUserDataManage}>
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              User Data Manage
            </ListItem>
            <ListItem onClick={handlelogout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              Log Out
            </ListItem>
          </List>
        </Drawer>
  
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable">
                  <Tab label="All User" {...a11yProps(0)} />
                  <Tab label="Search User by ID" {...a11yProps(1)} />
                  <Tab label="Update User information" {...a11yProps(2)} />
                  <Tab label="Add new User" {...a11yProps(3)} />
              </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
              <AllUsers />
          </TabPanel>
          
          <TabPanel value={value} index={1}>
              <SearchByID />
          </TabPanel>

          <TabPanel value={value} index={2}>
              <UpdateUserByID />
          </TabPanel>

          <TabPanel value={value} index={3}>
              <AddUser />
          </TabPanel>
        </Box>
      </Box>
    );
}
  

export default UserDataManage;