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
import ListItemIcon from '@mui/material/ListItemIcon';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import Logout from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Button, Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

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
    }

    const handlelogout = () => {
        window.location = '/';
    }

    const handleCourtManage = () => {
        window.location = '/AdminHome';
    }

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

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Container maxWidth="xs">
                    <Typography paragraph variant="h4" sx={{ fontFamily: '-apple-system ', fontWeight: 700 ,mt:4}}>
                        Edit User Information
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            '& .MuiTextField-root': { width: '30ch' },    
                        }}
                    >
                        <TextField sx={{ mt: 4 }} label={'Student ID'} id="studentID" />
                        <TextField sx={{ mt: 5 }} label={'First Name'} id="firstname" />
                        <TextField sx={{ mt: 5 }} label={'Last Name'} id="lastname" />
                        <TextField sx={{ mt: 5 }} label={'Email'} id="email" />
                        <TextField sx={{ mt: 5 }} label={'Priveliege'} id="priveliege" />
                        <Button sx={{ mt: 5, width: 100, height: 45 }} variant="contained" color="inherit">
                            Confirm
                        </Button>

                    </Box>
                </Container>

            </Box>
        </Box>
    );
}

export default UserDataManage;