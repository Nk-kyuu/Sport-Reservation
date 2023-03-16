const mysql = require("mysql2");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sportcourt",
  });