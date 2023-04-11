const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
//const session = require("express-session");
const { response } = require("express");
const bcrypt = require("bcrypt");
const jsonParser = bodyParser.json();
const jwt = require("jsonwebtoken");
const secret = "secretlog";
const { db } = require("./database");

app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extends: true }));
// app.use(bodyParser.json());
const saltRounds = 10;

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "sportcourt",
// });

// app.use(
//   session({
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true,
//   })
// );


//bcrypt
// db.query(
//     "SELECT UserID, password FROM user",
//     function (error, result, fields) {
//       if (error) throw error;
//       result.forEach(function (user) {
//         bcrypt.genSalt(saltRounds, function (err, salt) {
//           bcrypt.hash(user.password, salt, function (err, hash) {
//             db.query(
//               "UPDATE user SET password = ? WHERE UserID = ?",
//               [hash, UserID],
//               function (error, results, fields) {
//                 if (error) throw error;
//                 console.log(`User ${user.UserID} updated2`);
//               }
//             );
//           });
//         });
//       });
//     }
//   );

// db.query(
//   "SELECT UserID, password FROM user",
//   function (error,result, fields) {
//     if (error) throw error;

//     if (result.length > 0) {
//       // If a user with this username already exists, check if their password is already hashed
//       const hashedPassword = result[0].password;
//       const isPasswordHashed = bcrypt.compare(password, hashedPassword);

//       if (isPasswordHashed) {
//         // If the password is already hashed, use it directly
//         password = hashedPassword;
//       } else {
//         // If the password is not hashed, hash it before storing it in the database

//         results.forEach(function (user) {
//           bcrypt.genSalt(saltRounds, function (err, salt) {
//             bcrypt.hash(user.password, salt, function (err, hash) {
//               db.query(
//                 "UPDATE user SET password = ? WHERE UserID = ?",
//                 [hash, user.UserID],
//                 function (error, results, fields) {
//                   if (error) throw error;
//                   console.log(`User ${user.UserID} updated`);
//                 }
//               );
//             });
//           });
//         });
//       }
//     }
//   }
// );
// function checkpassword(user){
// db.query('SELECT password FROM user WHERE UserID = ?',[user.UserID], function (error, results, fields) {
//   if (error) throw error;

//   if (results.length > 0) {
//     // If a user with this username already exists, check if their password is already hashed
//     const hashedPassword = results[0].password;
//     const isPasswordHashed = bcrypt.compare(user.password, hashedPassword);

//     if (isPasswordHashed) {
//       // If the password is already hashed, use it directly
//       user.password = hashedPassword;

//     } else {
//       // If the password is not hashed, hash it before storing it in the database
//       bcryptPassword(req);
//     }
// //   } else {
// //     // If the user doesn't exist, hash the password before storing it in the database
// //     bcryptPasswordAndCreateUser(userData);
//    }

//   return;
// });
// }
// function bcryptPassword(req) {
//     db.query(
//           "SELECT UserID, password FROM user",
//           function (error, results, fields) {
//             if (error) throw error;

//             results.forEach(function (user) {
//               bcrypt.genSalt(saltRounds, function (err, salt) {
//                 bcrypt.hash(user.password, salt, function (err, hash) {
//                   db.query(
//                     "UPDATE user SET password = ? WHERE UserID = ?",
//                     [hash, user.UserID],
//                     function (error, results, fields) {
//                       if (error) throw error;
//                       console.log(`User ${user.UserID} updated`);
//                     }
//                   );
//                 });
//               });
//             });
//           }
//         );

//       }

//     db.query(
//     "SELECT UserID, password FROM user",
//     function (error, result, fields) {
//       if (error) throw error;
//       result.forEach(function (user) {
//         bcrypt.genSalt(saltRounds, function (err, salt) {
//           bcrypt.hash(user.password, salt, function (err, hash) {
//             db.query(
//               "UPDATE user SET password = ? WHERE UserID = ?",
//               [hash, user.UserID],
//               function (error, results, fields) {
//                 if (error) throw error;
//                 console.log(`User ${user.UserID} updated2`);
//               }
//             );
//           });
//         });
//       });
//     }
//   );

const logintest = () => {
  app.post("/login", jsonParser, (req, res, next) => {
    const password = req.body.password;
    //const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const UserID = req.body.UserID;
    //   db.query(
    //     "SELECT password FROM user WHERE UserID = ?",
    //     [UserID],
    //     function (error, result, fields) {
    //       result.forEach(function (result) {
    //         if (error) throw error;
    //         if (result.length > 0 && result.length <2) {
    //           // If a user with this username already exists, check if their password is already hashed
    //           const hashedPassword = result[0].password;
    //           const isPasswordHashed = bcrypt.compareSync(password, hashedPassword);
    //           if (isPasswordHashed) {
    //             // If the password is already hashed, use it directly
    //             password = hashedPassword;
    //           } else {
    //             bcryptPasswordAndCreateUser(result)
    //          }
    //         } else {
    //           // If the password is not hashed, hash it before storing it in the database
    //           bcryptPasswordAndCreateUser(result)
    //         }
    //       });
    //     }
    //   );
    db.query(
      "SELECT * FROM user WHERE UserID = ?",
      [UserID],
      function (err, user, fields) {
        if (err) {
          //     req.session.loggedin = true;
          //     req.session.UserID = UserID;
          //   res.redirect("/home");
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
            //localStorage.setItem('token', data.token);
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

  //session
  // app.post("/login", (req, res, next) => {
  //   const password = req.body.password;
  //   //const hashedPassword = bcrypt.hashSync(password, saltRounds);
  //   const UserID = req.body.UserID;
  //   if (UserID && password) {
  //     db.query(
  //       "SELECT * FROM user WHERE UserID = ? AND password = ?",
  //       [UserID, password],
  //       (err, result, fields) => {
  //         if (result.length > 0) {
  //             req.session.loggedin = true;
  //             req.session.UserID = UserID;
  //           res.redirect("/home");
  //         } else {
  //           //res.json({ status: "error", message: "no user found" });
  //           res.send("please enter userID and password again");
  //           return;
  //         }
  //       }
  //     );
  //   } else {
  //     response.send("Please enter userID and password");
  //     response.end();
  //   }
  // });
  // app.get('/home', function(req, res){
  //     if(req.session.loggedin){
  //         response.send('Welcome back');
  //     }else{
  //         response.send("Please login");
  //     }
  //     response.end();
  // })
}
module.exports = logintest;
