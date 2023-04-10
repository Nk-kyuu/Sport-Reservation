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


//server port
app.listen(5000, () => {
  console.log("Server started successfully");
});
