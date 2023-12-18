const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "memory_lane_db",
});

pool.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("povezano zBazom");
});

module.exports = pool;
