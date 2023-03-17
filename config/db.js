const mysql = require("mysql");
const db = mysql.createConnection({
  host: process.env.HOST_KEY,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

module.exports = db;
