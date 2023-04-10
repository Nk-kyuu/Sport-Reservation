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
const loginControl = require("./logintest");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extends: true }));
app.use(bodyParser.json());
const saltRounds = 10;

// app.use("/login", loginControl);
// app.use("/authen", loginControl)

//login 
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

app.post("/authen", jsonParser, function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secret);
    res.json({ status: "ok", decoded });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server started successfully");
});
