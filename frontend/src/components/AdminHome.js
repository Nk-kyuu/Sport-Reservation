import * as React from 'react';
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
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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
                            <Tab label="Basketball Court1" {...a11yProps(1)} />
                            <Tab label="Basketball Court2" {...a11yProps(2)} />
                            <Tab label="Basketball Court3" {...a11yProps(3)} />
                            <Tab label="Badminton Court1" {...a11yProps(4)} />
                            <Tab label="Badminton Court2" {...a11yProps(5)} />
                            <Tab label="Badminton Court3" {...a11yProps(6)} />
                            <Tab label="Volleyball Court1" {...a11yProps(7)} />
                            <Tab label="Volleyball Court2" {...a11yProps(8)} />
                            <Tab label="Football Court" {...a11yProps(9)} />
                        </Tabs>
                    </Box>

                    <TabPanel value={value} index={0}>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Switch {...label} defaultChecked />
                        </Box>
                        <Container sx={{ mt: 5 }}>
                            <Grid container spacing={2}>
                                <Grid xs={6}>
                                    <TableContainer component={Paper} sx={{ width: 700, height: 550 }}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Dessert (100g serving)</TableCell>
                                                    <TableCell align="right">Calories</TableCell>
                                                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell align="right">{row.calories}</TableCell>
                                                        <TableCell align="right">{row.fat}</TableCell>
                                                        <TableCell align="right">{row.carbs}</TableCell>
                                                        <TableCell align="right">{row.protein}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>

                                <Grid xs={6}>
                                    <Box sx={{
                                        ml: 30, display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'row'
                                    }}>
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={Date}
                                            sx={{ width: 300 }}
                                            renderInput={(params) => <TextField {...params} label="Date" />}
                                        />
                                    </Box>

                                </Grid>

                            </Grid>
                        </Container>
                    </TabPanel>


                    
                    <TabPanel value={value} index={1}>
                        ลองส่วนbackendก่อน
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        Item One
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        Item Three
                    </TabPanel>
                    <TabPanel value={value} index={6}>
                        Item One
                    </TabPanel>
                    <TabPanel value={value} index={7}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={8}>
                        Item Three
                    </TabPanel>
                    <TabPanel value={value} index={9}>
                        Item Three
                    </TabPanel>
                </Box>

            </Box>


        </Box>
    );
}

export default AdminHome;