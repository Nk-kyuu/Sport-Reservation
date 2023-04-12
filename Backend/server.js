const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { response } = require("express");
const bcrypt = require("bcrypt");
const jsonParser = bodyParser.json();
const jwt = require("jsonwebtoken");
const secret = "secretlog";
const db = require("./database");
//const loginControl = require("./logintest");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extends: true }));
app.use(bodyParser.json());
const saltRounds = 10;

// app.use("/login", loginControl);
// app.use("/authen", loginControl)

//user login 
app.post("/login", jsonParser, (req, res, next) => {
  const password = req.body.password;
  const UserID = req.body.UserID;

  db.query(
    'SELECT * FROM user WHERE UserID = ?',
    [UserID],
    function (err, user, fields) {
      if (err) {
        res.json({ status: "error", message: "failed" });
        return;
      }
      if (user.length == 0) {
        res.json({ status: "error", message: "no user found" });
        //res.send("please enter userID and password again");
        return;
      } 
      bcrypt.compare(password, user[0].password, function (err, islogin) {
        if (islogin) {
          const token = jwt.sign({ UserID: user[0].UserID }, secret, {
            expiresIn: "1h",
          });
          res.json({ status: "ok", message: "success", token });
          //res.redirect("/home");
        } else {
          res.json({ status: "error", message: "failed" });
        }
      });
    }
  );
});

//user authentication
app.post("/authen", jsonParser, (req, res, next) =>{
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secret);
    res.json({ status: "ok", decoded });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];

    try {
      // Verify the token and retrieve the payload
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      // Add the UserID to the request object for use in subsequent middleware
      req.UserID = payload.UserID;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    res.status(401).json({ error: 'Authorization header not found' });
  }
};

app.get('/dashboard', verifyToken, (req, res) => {
  // Retrieve the user's data from the database using their UserID
  const UserID = db.getUserById(req.UserID);

  res.json({ UserID });
});


//reserve
app.post("/reserve", jsonParser, (req, res, next) =>{
  const UserID = req.body.UserID;
  const Date = req.body.Date;
  const Time = req.body.Time;
  const CourtID = req.body.CourtID;
  // console.log(UserID)
  // console.log(Date)
  // console.log(Time)
  // console.log(CourtID)
  //update reserveStatus from reservation
  // const checkTimeID = db.query('SELECT timesID FROM times WHERE TimeList =?',[Time])
  //const checkAvail = db.query('SELECT AvailabilityID FROM availabilty WHERE CourtID =?, dates =?, timesID=?',[CourtID,Date,checkTimeID])
  
  db.beginTransaction((error) => {
    if (error){
      console.error('Error beginning transaction:', error);
      return res.status(500).json({ error: 'Internal server error' });
    };

    const timeQuery ="SELECT timesID FROM times WHERE TimeList =?";
    const timeValues = [Time];
    db.query(timeQuery, timeValues, (error, timeResult) => {
      if (error) {
        db.rollback(() => {
          throw error;
        });
        return;
      }

      const timesID = timeResult[0].timesID;

      const availabilityQuery = 'SELECT AvailabilityID FROM availabilty WHERE CourtID =?, dates =?, timesID=?';
      const availabilityValues = [CourtID,Date,timesID];
      db.query(availabilityQuery, availabilityValues, (error, availabilityResult) => {
        if (error) {
          console.error('Error inserting into availability table:', error);
          db.rollback(() => {
            res.status(500).json({ error: 'Internal server error' });
          });
          return;
        }

        const availabilityID = availabilityResult.insertId;

        const reservationQuery = 'INSERT INTO reservation( ReserveDate ,ReserveStatus , UserID, AvailableID) VALUES (?, 1, ?, ?)';
        const reservationValues = [Date,UserID, availabilityID];
        db.query(reservationQuery, reservationValues, (error, reservationResult) => {
          if (error) {
            db.rollback(() => {
              throw error;
            });
          }

          db.commit((error) => {
            if (error) {
              db.rollback(() => {
                throw error;
              });
            }

            res.status(201).json({ message: 'Reservation created', reservationID: reservationResult.insertId });
          });
        });
      });
    });
  });
  // db.query(
  //   'INSERT INTO reservation( ReserveDate ,ReserveStatus , UserID, AvailableID)  VALUES(?,1,?,3)',[Date,UserID,], //avaibilityID
  //   function (err, result, fields) {
  //     if (err) {
  //       res.json({ status: "error", message: "failed" });
  //       return;
  //     } else {
  //       //console.log(`Reservation ${UserID} updated to 1`);
  //        res.json({ status: "ok", message: "success"});
  //     }

  //   })
})

//----------------------------------------------------------------------------------------------------------------//
//admin

// Get all users
app.get("/users",(req, res)=>{
  db.query("SELECT * FROM user", (err, result)=> {
      if(err){
          console.log(err)
      }else{
          res.send(result)
      }
  })
})

// Get a single user by ID
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM user WHERE UserID = ?", [id], (err, results) => {
    if (err) {
      console.error("Error fetching user: ", err);
      res.status(500).json({ error: "Internal server error." });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "User not found." });
      return;
    }
    res.status(200).json(results[0]);
  });
});

// Add a new user
app.post("/adduser", jsonParser, (req, res) => {
  const { UserID, Password, first_name, last_name, email, privilegee } = req.body;
  const hash = bcrypt.hashSync(Password, 10);
  db.query(
    "INSERT INTO user (UserID, Password, first_name, last_name, email, privilegee) VALUES (?, ?, ?, ?, ?, ?)",
    [UserID, hash, first_name, last_name, email, privilegee],
    (err, result) => {
      if (err) {
        console.error("Error adding user: ", err);
        res.status(500).json({ error: "Internal server error." });
        return;
      }
      res.status(201).json({ message: "User added successfully." });
    }
  );
});

//update user by id
app.put("/userUpdate/:UserID", jsonParser, (req, res) => {
  const { UserID } = req.params;
  const { Password, first_name, last_name, email, privilegee } = req.body;
  const hash = bcrypt.hashSync(Password, 10);
  db.query(
    "UPDATE user SET Password = ?, first_name = ?, last_name = ?, email = ?, privilegee = ? WHERE UserID = ?",
    [hash, first_name, last_name, email, privilegee, UserID],
    (err, result) => {
      if (err) {
        console.error("Error updating user: ", err);
        res.status(500).json({ error: "Internal server error." });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "User not found." });
        return;
      }
      res.status(200).json({ message: "User updated successfully." });
    }
  );
});

// Delete an existing user by ID
/*app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM user WHERE UserID = ?", id, (err, result) => {
    if (err) {
      console.error("Error deleting user: ", err);
      res.status(500).json({ error: "Internal server error." });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "User not found." });
      return;
    }
    res.status(200).json({ message: "User deleted successfully." });
  });
});*/

// Get all reservations
app.get("/reservations", (req, res) => {
  db.query(
    "SELECT r.ReserveID, r.ReserveDate, r.ReserveStatus, u.UserID, u.first_name, u.last_name, a.AvailabilityID, a.CourtID, a.dates, t.timesID, t.TimeList, c.CourtType, c.Floor, c.CourtStatus FROM reservation r INNER JOIN `user` u ON r.UserID = u.UserID INNER JOIN availability a ON r.AvailabilityID = a.AvailabilityID INNER JOIN times t ON a.timesID = t.timesID INNER JOIN court c ON a.CourtID = c.CourtID;",
    (err, results) => {
      if (err) {
        console.error("Error getting reservations: ", err);
        res.status(500).json({ error: "Internal server error." });
        return;
      }
      res.status(200).json(results);
    }
  );
});

app.get("/reservationsByID", (req, res) => {
  const courtId = req.query.courtID;
  db.query(
    "SELECT r.ReserveID, r.ReserveDate, r.ReserveStatus, u.UserID, u.first_name, u.last_name, a.AvailabilityID, a.CourtID, a.dates, t.timesID, t.TimeList, c.CourtType, c.Floor, c.CourtStatus FROM reservation r INNER JOIN `user` u ON r.UserID = u.UserID INNER JOIN availability a ON r.AvailabilityID = a.AvailabilityID INNER JOIN times t ON a.timesID = t.timesID INNER JOIN court c ON a.CourtID = c.CourtID WHERE c.courtID = ?",
    [courtId],
    (err, results) => {
      if (err) {
        console.error("Error getting reservations: ", err);
        res.status(500).json({ error: "Internal server error." });
        return;
      }
      console.log("Results:", results); // Add this line for debugging
      res.status(200).json(results);
    }
  );
});

// Delete a reservation by ReserveID
app.delete("/DeleteReservations/:id", (req, res) => {
  const reserveId = req.params.id;

  db.query("DELETE FROM reservation WHERE ReserveID = ?", [reserveId], (err, result) => {
    if (err) {
      console.error("Error deleting reservation: ", err);
      res.status(500).json({ error: "Internal server error." });
      return;
    }
    res.status(200).json({ message: "Reservation deleted successfully." });
  });
});

// Update reservation status based on availability status
app.put("/reservationsStatus/:id", (req, res) => {
  const availabilityId = req.params.id;
  db.query(
    "UPDATE reservation SET ReserveStatus = 1 WHERE AvailabilityID = ?",
    [availabilityId],
    (err, results) => {
      if (err) {
        console.error("Error updating reservation status: ", err);
        res.status(500).json({ error: "Internal server error." });
        return;
      }
      console.log("Reservation status updated for Availability ID: ", availabilityId);
      res.status(200).json({ message: "Reservation status updated successfully." });
    }
  );
});

// Update reservation status
app.put("/UpdateReservations/:id", (req, res) => {
  const reserveId = req.params.id;

  db.beginTransaction((error) => {
    if (error) {
      console.error("Error beginning transaction:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    const updateReservationQuery = "UPDATE reservation SET ReserveStatus = 0 WHERE ReserveID = ?";
    db.query(updateReservationQuery, [reserveId], (error, result) => {
      if (error) {
        db.rollback(() => {
          console.error("Error updating reservation status:", error);
          res.status(500).json({ error: "Internal server error" });
        });
        return;
      }

      const availabilityIDQuery = "SELECT AvailabilityID FROM reservation WHERE ReserveID = ?";
      db.query(availabilityIDQuery, [reserveId], (error, availabilityResult) => {
        if (error) {
          db.rollback(() => {
            console.error("Error retrieving availability ID:", error);
            res.status(500).json({ error: "Internal server error" });
          });
          return;
        }

        const availabilityID = availabilityResult[0].AvailabilityID;

        const updateAvailabilityQuery = "UPDATE availability SET Status = 1 WHERE AvailabilityID = ?";
        db.query(updateAvailabilityQuery, [availabilityID], (error, result) => {
          if (error) {
            db.rollback(() => {
              console.error("Error updating availability status:", error);
              res.status(500).json({ error: "Internal server error" });
            });
            return;
          }

          db.commit((error) => {
            if (error) {
              db.rollback(() => {
                console.error("Error committing transaction:", error);
                res.status(500).json({ error: "Internal server error" });
              });
              return;
            }

            res.status(200).json({ message: "Reservation and availability status updated successfully" });
          });
        });
      });
    });
  });
});



// Get all availabilities
app.get("/availabilities", (req, res) => {
  db.query("SELECT a.AvailabilityID, c.CourtType, t.TimeList, a.dates, a.Status FROM availability a JOIN court c ON a.CourtID = c.CourtID JOIN times t ON a.timesID = t.timesID", 
  (err, result) => {
    if (err) {
      console.error("Error getting availabilities: ", err);
      res.status(500).json({ error: "Internal server error." });
      return;
    }
    res.status(200).json(result);
  });
});

// Get all availabilities dates
app.get("/distinct-dates", (req, res) => {
  db.query(
    "SELECT DISTINCT dates FROM availability",
    (err, result) => {
      if (err) {
        console.error("Error getting distinct dates: ", err);
        res.status(500).json({ error: "Internal server error." });
        return;
      }
      res.status(200).json(result);
    }
  );
});


// Get all availabilities according to CourtID
app.get("/availabilities/:courtId", (req, res) => {
  const courtId = req.params.courtId;

  db.query(
    "SELECT a.AvailabilityID, c.CourtType, t.TimeList, a.dates, a.Status FROM availability a JOIN court c ON a.CourtID = c.CourtID JOIN times t ON a.timesID = t.timesID WHERE a.CourtID = ?",
    [courtId],
    (err, result) => {
      if (err) {
        console.error("Error getting availabilities: ", err);
        res.status(500).json({ error: "Internal server error." });
        return;
      }
      res.status(200).json(result);
    }
  );
});

// Update an availability status by ID
app.put("/availabilities/:id", jsonParser, (req, res) => {
  const { id } = req.params;
  const { CourtID, dates, timesID, Status } = req.body;
  db.query(
    "UPDATE availability SET Status = ? WHERE AvailabilityID = ?",
    [Status, id],
    (err, result) => {
      if (err) {
        console.error("Error updating availability: ", err);
        res.status(500).json({ error: "Internal server error." });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Availability not found." });
        return;
      }
      res.status(200).json({ message: "Availability updated successfully." });
    }
  );
});

app.post("/checkdate", jsonParser,(req,res,next)=>{
  const Date = req.body.Date;
  console.log(Date)
  db.query(
    'UPDATE reservation SET ReserveStatus = 0 WHERE ReserveDate = ?',[Date], //avaibilityID
    function (err, result, fields) {
      if (err) {
        res.json({ status: "error", message: "failed" });
        return;
      } else {
        console.log(`Reservation ${Date} updated to 0`);
         res.json({ status: "ok", message: "success"});
      }
    })
})

//get time to show in front
app.get('/times', (req, res) => {
  db.query('SELECT TimeList FROM times',(err,result) =>{
    if (err) {
      console.log(err);
   }
   else {
     res.send(result);
   }
  })
})

//getTime test
// app.post('/getTimes',jsonParser, (req, res) => {
//   const Time = req.body.Time;
//   console.log(Time)
//   db.query('SELECT TimeList FROM times WHERE TimeList = ?',[Time], (err, result) => {
//     if (err) {
//       res.json({ status: "error", message: "failed" });
//       return;
//     } else {
//       console.log(`Reservation ${Time} updated to 0`);
//        res.json({ status: "ok", message: "success"});
//     }
//   })
// })

//get Court lists
app.get('/court', (req,res)=>{
  db.query('SELECT * FROM court',(err,result)=>{
    if(err){
      console.log(err);
    }
    else{
      res.send(result);
    }
  })
})

//getCourtID test
// app.post('/getCourt', jsonParser,(req,res)=>{
//   const CourtID = req.body.CourtID;
//   console.log(CourtID);
//   db.query('SELECT * FROM court WHERE CourtID = ?',[CourtID], (err, result) => {
//     if (err) {
//       res.json({ status: "error", message: "failed" });
//       return;
//     } else {
//       console.log(`Reservation ${CourtID} updated to 0`);
//        res.json({ status: "ok", message: "success"});
//     }
//   })

// } )

//show reservation
app.get('/getreservation', (req,res) =>{
  const UserID = req.body.UserID;
  console.log('reservation call')
  db.query('SELECT r.ReserveID, r.ReserveDate, r.ReserveStatus, u.UserID, u.Firstname, u.Lastname, a.AvailabilityID, a.CourtID, a.dates, t.timesID, t.TimeList, c.CourtType, c.Floor, c.CourtStatus FROM reservation r INNER JOIN user u ON r.UserID = u.UserID INNER JOIN availability a ON r.AvailabilityID = a.AvailabilityID INNER JOIN times t ON a.timesID = t.timesID INNER JOIN court c ON a.CourtID = c.CourtID  ', (err, result) => {
    if (err) {
      console.log(err);

   }
   else {
     res.send(result);
     console.log(result)
    }
  })
})


//server port
app.listen(5000, () => {
  console.log("Server started successfully");
});
