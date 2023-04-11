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
  db.query(
    'UPDATE reservation SET ReserveStatus = 1 WHERE UserID = ?',[UserID],
    function (err, result, fields) {
      if (err) {
        res.json({ status: "error", message: "failed" });
        return;
      } else {
        console.log(`Reservation ${UserID} updated to 1`);
         res.json({ status: "ok", message: "success"});
      }

    })
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
app.post("/adduser",(req, res)=>{
  const UserID = req.body.UserID;
  const Password = req.body.Password;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const privilegee = req.body.privilegee;
  const hash = bcrypt.hashSync(Password, 10);

  db.query("INSERT INTO user (UserID, Password, first_name, last_name, email, privilegee) VALUES(?, ?, ?, ?, ?)",
  [UserID, hash, first_name, last_name, email],
  (err, result)=>{
      if(err){
          console.log("error cant add new user : ", err)
      }else{
          console.log("Value inserted")
      }
  })
})

// Update an existing user by ID
app.put("/userUpdate/:id", jsonParser, (req, res) => {
  const { id } = req.params;
  const { Password, first_name, last_name, email, privilegee } = req.body;
  const hash = bcrypt.hashSync(Password, 10);
  db.query(
    "UPDATE user SET Password = ?, first_name = ?, last_name = ?, email = ?, privilegee = ? WHERE UserID = ?",
    [hash, first_name, last_name, email, id, privilegee],
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
    "SELECT r.ReserveID, r.ReserveDate, r.ReserveStatus, u.UserID, c.CourtType, t.startTime, t.endTime FROM reservation r JOIN court c ON r.courtID = c.CourtID JOIN times t ON r.timesID = t.timesID JOIN user u ON r.UserID = u.UserID",
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

// Get a reservation by ID
/*app.get("/reservations/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM reservation WHERE ReserveID = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Error getting reservation: ", err);
        res.status(500).json({ error: "Internal server error." });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: "Reservation not found." });
        return;
      }
      res.status(200).json(results[0]);
    }
  );
});*/

// Get all availabilities
app.get("/availabilities", (req, res) => {
  db.query("SELECT a.AvailabilityID, c.CourtType, t.startTime, t.endTime, a.dates, a.Status FROM availability a JOIN court c ON a.CourtID = c.CourtID JOIN times t ON a.timesID = t.timesID", 
  (err, result) => {
    if (err) {
      console.error("Error getting availabilities: ", err);
      res.status(500).json({ error: "Internal server error." });
      return;
    }
    res.status(200).json(result);
  });
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


//server port
app.listen(5000, () => {
  console.log("Server started successfully");
});
