const mysql = require("mysql2");
const express = require("express");
const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "memory_lane_db",
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("povezano zBazom");
});
