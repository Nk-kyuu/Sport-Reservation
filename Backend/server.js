const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sportcourt",
});

// app.get("/user", (req, res) => {
//   db.query("SELECT * FROM user", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

app.use(bodyParser.urlencoded({ extends: true }));
app.use(bodyParser.json());

app.post("/login", (req, res, next) => {
  const password = req.body.password;
  //const hashedPassword = bcrypt.hashSync(password, saltRounds);
  const UserID = req.body.UserID;

  db.query(
    "SELECT * FROM user WHERE UserID = ? AND password = ?",
    [UserID, password],
    (err, result, fields) => {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      if (result.length == 0) {
        //res.json({ status: "error", message: "no user found" });
        res.send("please enter userID and password again");
        return;
      }
    
        // if(isLogin){
        //       res.json({status: 'ok', message:'login sucess'})
        //   } else{
        //       res.json({status: 'error', message: 'login failed'})
        //   }
      
    // bcrypt.compare(hashedPassword, result[0].password, function(err, isLogin) {
    
    // });
    res.redirect("/home");}
  );
});

app.listen(5000, () => {
  console.log("Server started successfully");
});
