import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Container, Toolbar } from "@mui/material";
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
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Grid from "@mui/material/Unstable_Grid2";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
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

//add
const itemData = [
  {
    img: images1,
  },
  {
    img: images2,
  },
  {
    img: images3,
  },
  {
    img: images4,
  },
  {
    img: images5,
  },
  {
    img: images6,
  },
  {
    img: images7,
  },
  {
    img: images8,
  },
  {
    img: images9,
  },
];
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

    //   fetch("http://localhost:5000/checkrev", {
    //     method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(jsonData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     //console.error('success:', data);
    //     if (data.status == "ok") {
    //       alert("update successfully");
    //     } else {
    //       alert("update failed");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedDate, setSelectedDate] = useState(localStorage.getItem('selectedDate') || null);
  //console.log(dates);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };  
  
  const handleLogout = (event) => {
      event.preventDefault();
      localStorage.removeItem("token");
      window.location = "/";
    };

  const handlemyrev = () =>{
    window.location = '/MyReservation';
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleSelectDate = (date) => {
    window.location = "/Court";
    setSelectedDate(date);
    const formatDate = dayjs(selectedDate).format('YYYY-MM-DD');
    localStorage.setItem('Date', formatDate);
    const getDate = localStorage.getItem('Date')
    console.log(getDate)
      const jsonData = {
        Date: getDate,  
      };
      fetch("http://localhost:5000/checkdate", {
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
            //alert("update successfully");
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

      <Grid container spacing={2}>
        <Grid xs={5} sx={{ ml: 15, mt: 10 }}>
          <ImageList
            sx={{ width: 700, height: 600 }}
            cols={3}
            rowHeight={164}
            gap={8}
          >
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>

        {/* <Grid xs={5}>
              <Autocomplete
                id="dates"
                options={dates}
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
            </Grid> */}
        <Grid xs={6}>
          <Container sx={{ mt: 25 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateCalendar"]} >
                <DateCalendar
                  defaultValue={dayjs("2022-04-17")}
                 date={selectedDate}
      onChange={handleSelectDate}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
            }
export default Home;
