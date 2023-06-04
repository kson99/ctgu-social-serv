const mysql = require("mysql");
const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST_KEY,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.getConnection((err, connection) => {
  if (err) {
    console.log("Error connecting to MySQL database", err);
    return;
  }

  console.log("Connected to MySQL database!");

  //release connection
  connection.release();
});

module.exports = db;
