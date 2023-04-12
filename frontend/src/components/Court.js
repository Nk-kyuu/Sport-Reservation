import * as React from "react";
import { Container, Toolbar, getRatingUtilityClass } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import images1 from "./images/Basketball_Court1.jpeg";
import images2 from "./images/Basketball_Court2.jpeg";
import images3 from "./images/Basketball_Court3.png";
import images4 from "./images/Badminton_Court1.jpeg";
import images5 from "./images/Badminton_Court2.jpeg";
import images6 from "./images/Badminton_Court3.jpeg";
import images7 from "./images/Volleyball_Court1.png";
import images8 from "./images/Volleyball_Court2.jpeg";
import images9 from "./images/Football_Court.jpeg";
import { useEffect, useState } from "react";

// const time = [
//   { label: '15.00 - 16.00' },
//   { label: '16.00 - 17.00' },
//   { label: '17.00 - 18.00' },
//   { label: '18.00 - 19.00' },
//   { label: '19.00 - 20.00' },
//   { label: '20.00 - 21.00' },
//   { label: '21.00 - 22.00' }
// ]

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Court() {
  const [times, setTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [courtNames, setCourtNames] = useState([]);
  useEffect(() => {
    //user authen
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

    //get time lists
    fetch("http://localhost:5000/times")
      .then((response) => response.json())
      .then((data) => setTimes(data))
      .catch((error) => console.log(error));

    //get court lists
    fetch("http://localhost:5000/court")
      .then((response) => response.json())
      .then((data) => {
        // map the response data to a new array that includes both CourtType and CourtNumber
        const courtNames = data.map((court) => ({
          CourtType: court.CourtType,
          CourtID: court.CourtID,
        }));
        setCourtNames(courtNames);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location = "/";
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

  const handleSelectTime = (event, value) => {
    setSelectedTime(value.TimeList);
    localStorage.setItem("selectedTime", value.TimeList);
    // const getTime = localStorage.getItem('selectedTime');
    // console.log(getTime)
    //   const jsonData = {
    //     Time: getTime,
    //   };
    //   fetch("http://localhost:5000/getTimes", {
    //     method: "post",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(jsonData),

    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       //console.error('success:', data);
    //       if (data.status == "ok") {
    //         //alert("update successfully");
    //       } else {
    //         alert("update failed");
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
  };

  const handleSelectCourt = (event, index) => {
    const CourtID = courtNames[index].CourtID;
    localStorage.setItem("CourtID", CourtID);
    const getCourtID = localStorage.getItem("CourtID");
    console.log(getCourtID);
    // //console.log(`Clicked on court number ${CourtID}`);
    // const jsonData = {
    //   CourtID: getCourtID,
    // };
    // fetch("http://localhost:5000/getCourt", {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(jsonData),

    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     //console.error('success:', data);
    //     if (data.status == "ok") {
    //       //alert("update successfully");
    //     } else {
    //       alert("update failed");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };

  const handlemyrev = () => {
    window.location = "/MyReservation";
  };

  const handleReserve = (event, date) => {
    const getUser = localStorage.getItem("UserID");
    const getDate = localStorage.getItem("Date");
    const getCourtID = localStorage.getItem("CourtID");
    const getTime = localStorage.getItem("selectedTime");
    console.log(getDate);
    const jsonData = {
      UserID: getUser,
      Date: getDate,
      CourtID: getCourtID,
      Time: getTime,
    };
    fetch("http://localhost:5000/reserve", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
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

  return (
    <Box>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <CalendarMonthIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              sx={{
                mr: 143, //ห่างจากโปรไฟล์
                display: { xs: "none", md: "flex" },
                fontFamily: "Segoe UI",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
              variant="h6"
            >
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
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handlemyrev}>
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
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>

      {/* 
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
        </Box> */}

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {courtNames.map((court, index) => (
              <Tab
                label={court.CourtType}
                key={court.CourtType}
                {...a11yProps(index)}
                onClick={(event) => handleSelectCourt(event, index)}
              />
            ))}
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <Grid container spacing={2} sx={{ mt: 5, ml: 10 }}>
            <Grid xs={7}>
              <Card sx={{ width: 650, height: 550 }}>
                <CardMedia component="img" height="550" image={images1} />
              </Card>
            </Grid>
            <Grid xs={5}>
              <Autocomplete
                id="times"
                options={times}
                getOptionLabel={(option) => option.TimeList}
                value={{ TimeList: selectedTime }}
                onChange={handleSelectTime}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Times" />
                )}
              />
              <Button
                variant="contained"
                onClick={handleReserve}
                sx={{ width: 100, height: 45, mt: 5, mr: 34 }}
              >
                Reserve
              </Button>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Grid container spacing={2} sx={{ mt: 5, ml: 10 }}>
            <Grid xs={7}>
              <Card sx={{ width: 650, height: 550 }}>
                <CardMedia component="img" height="550" image={images2} />
              </Card>
            </Grid>
            <Grid xs={5}>
              <Autocomplete
                id="times"
                options={times}
                getOptionLabel={(option) => option.TimeList}
                value={{ TimeList: selectedTime }}
                onChange={handleSelectTime}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Times" />
                )}
              />
              <Button
                variant="contained"
                onClick={handleReserve}
                sx={{ width: 100, height: 45, mt: 5, mr: 34 }}
              >
                Reserve
              </Button>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Grid container spacing={2} sx={{ mt: 5, ml: 10 }}>
            <Grid xs={7}>
              <Card sx={{ width: 650, height: 550 }}>
                <CardMedia component="img" height="550" image={images3} />
              </Card>
            </Grid>
            <Grid xs={5}>
              <Autocomplete
                id="times"
                options={times}
                getOptionLabel={(option) => option.TimeList}
                value={{ TimeList: selectedTime }}
                onChange={handleSelectTime}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Times" />
                )}
              />
              <Button
                variant="contained"
                onClick={handleReserve}
                sx={{ width: 100, height: 45, mt: 5, mr: 34 }}
              >
                Reserve
              </Button>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={3}>
          <Grid container spacing={2} sx={{ mt: 5, ml: 10 }}>
            <Grid xs={7}>
              <Card sx={{ width: 650, height: 550 }}>
                <CardMedia component="img" height="550" image={images4} />
              </Card>
            </Grid>
            <Grid xs={5}>
              <Autocomplete
                id="times"
                options={times}
                //getOptionLabel={(option) => option.time}
                getOptionLabel={(option) => option.TimeList}
                value={{ TimeList: selectedTime }}
                onChange={handleSelectTime}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Times" />
                )}
              />
              <Button
                variant="contained"
                onClick={handleReserve}
                sx={{ width: 100, height: 45, mt: 5, mr: 34 }}
              >
                Reserve
              </Button>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={4}>
          <Grid container spacing={2} sx={{ mt: 5, ml: 10 }}>
            <Grid xs={7}>
              <Card sx={{ width: 650, height: 550 }}>
                <CardMedia component="img" height="550" image={images5} />
              </Card>
            </Grid>
            <Grid xs={5}>
              <Autocomplete
                id="times"
                options={times}
                getOptionLabel={(option) => option.TimeList}
                value={{ TimeList: selectedTime }}
                onChange={handleSelectTime}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Times" />
                )}
              />
              <Button
                variant="contained"
                onClick={handleReserve}
                sx={{ width: 100, height: 45, mt: 5, mr: 34 }}
              >
                Reserve
              </Button>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={5}>
          <Grid container spacing={2} sx={{ mt: 5, ml: 10 }}>
            <Grid xs={7}>
              <Card sx={{ width: 650, height: 550 }}>
                <CardMedia component="img" height="550" image={images6} />
              </Card>
            </Grid>
            <Grid xs={5}>
              <Autocomplete
                id="times"
                options={times}
                getOptionLabel={(option) => option.TimeList}
                value={{ TimeList: selectedTime }}
                onChange={handleSelectTime}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Times" />
                )}
              />
              <Button
                variant="contained"
                onClick={handleReserve}
                sx={{ width: 100, height: 45, mt: 5, mr: 34 }}
              >
                Reserve
              </Button>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={6}>
          <Grid container spacing={2} sx={{ mt: 5, ml: 10 }}>
            <Grid xs={7}>
              <Card sx={{ width: 650, height: 550 }}>
                <CardMedia component="img" height="550" image={images7} />
              </Card>
            </Grid>
            <Grid xs={5}>
              <Autocomplete
                id="times"
                options={times}
                getOptionLabel={(option) => option.TimeList}
                value={{ TimeList: selectedTime }}
                onChange={handleSelectTime}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Times" />
                )}
              />
              <Button
                variant="contained"
                onClick={handleReserve}
                sx={{ width: 100, height: 45, mt: 5, mr: 34 }}
              >
                Reserve
              </Button>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={7}>
          <Grid container spacing={2} sx={{ mt: 5, ml: 10 }}>
            <Grid xs={7}>
              <Card sx={{ width: 650, height: 550 }}>
                <CardMedia component="img" height="550" image={images8} />
              </Card>
            </Grid>
            <Grid xs={5}>
              <Autocomplete
                id="times"
                options={times}
                getOptionLabel={(option) => option.TimeList}
                value={{ TimeList: selectedTime }}
                onChange={handleSelectTime}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Times" />
                )}
              />
              <Button
                variant="contained"
                onClick={handleReserve}
                sx={{ width: 100, height: 45, mt: 5, mr: 34 }}
              >
                Reserve
              </Button>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={8}>
          <Grid container spacing={2} sx={{ mt: 5, ml: 10 }}>
            <Grid xs={7}>
              <Card sx={{ width: 650, height: 550 }}>
                <CardMedia component="img" height="550" image={images9} />
              </Card>
            </Grid>
            <Grid xs={5}>
              <Autocomplete
                id="times"
                options={times}
                getOptionLabel={(option) => option.TimeList}
                value={{ TimeList: selectedTime }}
                onChange={handleSelectTime}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Times" />
                )}
              />
              <Button
                variant="contained"
                onClick={handleReserve}
                sx={{ width: 100, height: 45, mt: 5, mr: 34 }}
              >
                Reserve
              </Button>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={9}>
          <Grid container spacing={2} sx={{ mt: 5, ml: 10 }}>
            <Grid xs={7}>
              <Card sx={{ width: 650, height: 550 }}>
                <CardMedia component="img" height="550" image={images9} />
              </Card>
            </Grid>
            <Grid xs={5}>
              <Autocomplete
                id="times"
                options={times}
                getOptionLabel={(option) => option.TimeList}
                value={{ TimeList: selectedTime }}
                onChange={handleSelectTime}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Times" />
                )}
              />
              <Button
                variant="contained"
                onClick={handleReserve}
                sx={{ width: 100, height: 45, mt: 5, mr: 34 }}
              >
                Reserve
              </Button>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={10}>
          <Grid container spacing={2} sx={{ mt: 5, ml: 10 }}>
            <Grid xs={7}>
              <Card sx={{ width: 650, height: 550 }}>
                <CardMedia component="img" height="550" image={images9} />
              </Card>
            </Grid>
            <Grid xs={5}>
              <Autocomplete
                id="times"
                options={times}
                getOptionLabel={(option) => option.TimeList}
                value={{ TimeList: selectedTime }}
                onChange={handleSelectTime}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Times" />
                )}
              />
              <Button
                variant="contained"
                onClick={handleReserve}
                sx={{ width: 100, height: 45, mt: 5, mr: 34 }}
              >
                Reserve
              </Button>
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </Box>
  );
}

export default Court;
