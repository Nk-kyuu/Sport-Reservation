import * as React from 'react';
import { Container, Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import images1 from './images/Basketball_Court1.jpeg';
import images2 from './images/Basketball_Court2.jpeg';
import images3 from './images/Basketball_Court3.png';
import images4 from './images/Badminton_Court1.jpeg';
import images5 from './images/Badminton_Court2.jpeg';
import images6 from './images/Badminton_Court3.jpeg';
import images7 from './images/Volleyball_Court1.png';
import images8 from './images/Volleyball_Court2.jpeg';
import images9 from './images/Football_Court.jpeg';

const time = [
  { label: '15.00 - 16.00' },
  { label: '16.00 - 17.00' },
  { label: '17.00 - 18.00' },
  { label: '18.00 - 19.00' },
  { label: '19.00 - 20.00' },
  { label: '20.00 - 21.00' },
  { label: '21.00 - 22.00' }
]

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

function Court() {
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

  const handlelogout = () => {
    window.location = '/';
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            <CalendarMonthIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <ArticleOutlinedIcon />
                </ListItemIcon>
                My Reservation
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <QrCodeScannerIcon />
                </ListItemIcon>
                Verify Reservation
              </MenuItem>
              <MenuItem onClick={handlelogout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example">
            <Tab label="Basketball Court1" {...a11yProps(0)} />
            <Tab label="Basketball Court2" {...a11yProps(1)} />
            <Tab label="Basketball Court3" {...a11yProps(2)} />
            <Tab label="Badminton Court1" {...a11yProps(3)} />
            <Tab label="Badminton Court2" {...a11yProps(4)} />
            <Tab label="Badminton Court3" {...a11yProps(5)} />
            <Tab label="Volleyball Court1" {...a11yProps(6)} />
            <Tab label="Volleyball Court2" {...a11yProps(7)} />
            <Tab label="Football Court" {...a11yProps(8)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <Grid container spacing={2} sx={{ mt: 5, ml: 10 }} >
            <Grid xs={6}>
              <Card sx={{ width: 650, height: 550 }}>
                <CardMedia
                  component="img"
                  height="550"
                  image={images1}
                />
              </Card>
            </Grid >
            <Grid xs={5}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}>
                <Autocomplete
                  id="time"
                  options={time}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Time" />}
                />
                <Button variant="contained" sx={{ width: 100, height: 45, mt: 5 }}>
                  Reserve
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Grid container spacing={2} sx={{ mt: 5, ml: 10 }} >
            <Grid xs={6}>
              <Card sx={{ width: 650, height: 550 }}>
                <CardMedia
                  component="img"
                  height="550"
                  image={images2}
                />
              </Card>
            </Grid >
            <Grid xs={5}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}>
                <Autocomplete
                  id="time"
                  options={time}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Time" />}
                />
                <Button variant="contained" sx={{ width: 100, height: 45, mt: 5 }}>
                  Reserve
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Grid container spacing={2} sx={{ mt: 5, ml: 10 }} >
            <Grid xs={6}>
              <Card sx={{ width: 650, height: 550 }}>
                <CardMedia
                  component="img"
                  height="550"
                  image={images3}
                />
              </Card>
            </Grid >
            <Grid xs={5}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}>
                <Autocomplete
                  id="time"
                  options={time}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Time" />}
                />
                <Button variant="contained" sx={{ width: 100, height: 45, mt: 5 }}>
                  Reserve
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={3}>
          <Grid container spacing={2} sx={{ mt: 5, ml: 10 }} >
            <Grid xs={6}>
              <Card sx={{ width: 650, height: 550 }}>
                <CardMedia
                  component="img"
                  height="550"
                  image={images4}
                />
              </Card>
            </Grid >
            <Grid xs={5}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}>
                <Autocomplete
                  id="time"
                  options={time}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Time" />}
                />
                <Button variant="contained" sx={{ width: 100, height: 45, mt: 5 }}>
                  Reserve
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={4}>
          <Grid container spacing={2} sx={{ mt: 5, ml: 10 }} >
            <Grid xs={6}>
              <Card sx={{ width: 650, height: 550 }}>
                <CardMedia
                  component="img"
                  height="550"
                  image={images5}
                />
              </Card>
            </Grid >
            <Grid xs={5}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}>
                <Autocomplete
                  id="time"
                  options={time}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Time" />}
                />
                <Button variant="contained" sx={{ width: 100, height: 45, mt: 5 }}>
                  Reserve
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={5}>
          <Grid container spacing={2} sx={{ mt: 5, ml: 10 }} >
            <Grid xs={6}>
              <Card sx={{ width: 650, height: 550 }}>
                <CardMedia
                  component="img"
                  height="550"
                  image={images6}
                />
              </Card>
            </Grid >
            <Grid xs={5}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}>
                <Autocomplete
                  id="time"
                  options={time}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Time" />}
                />
                <Button variant="contained" sx={{ width: 100, height: 45, mt: 5 }}>
                  Reserve
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={6}>
          <Grid container spacing={2} sx={{ mt: 5, ml: 10 }} >
            <Grid xs={6}>
              <Card sx={{ width: 650, height: 550 }}>
                <CardMedia
                  component="img"
                  height="550"
                  image={images7}
                />
              </Card>
            </Grid >
            <Grid xs={5}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}>
                <Autocomplete
                  id="time"
                  options={time}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Time" />}
                />
                <Button variant="contained" sx={{ width: 100, height: 45, mt: 5 }}>
                  Reserve
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={7}>
          <Grid container spacing={2} sx={{ mt: 5, ml: 10 }} >
            <Grid xs={6}>
              <Card sx={{ width: 650, height: 550 }}>
                <CardMedia
                  component="img"
                  height="550"
                  image={images8}
                />
              </Card>
            </Grid >
            <Grid xs={5}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}>
                <Autocomplete
                  id="time"
                  options={time}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Time" />}
                />
                <Button variant="contained" sx={{ width: 100, height: 45, mt: 5 }}>
                  Reserve
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={8}>
          <Grid container spacing={2} sx={{ mt: 5, ml: 10 }} >
            <Grid xs={6}>
              <Card sx={{ width: 650, height: 550 }}>
                <CardMedia
                  component="img"
                  height="550"
                  image={images9}
                />
              </Card>
            </Grid >
            <Grid xs={5}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}>
                <Autocomplete
                  id="time"
                  options={time}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Time" />}
                />
                <Button variant="contained" sx={{ width: 100, height: 45, mt: 5 }}>
                  Reserve
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </Box>
  );
}

export default Court;