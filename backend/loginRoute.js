const connection = require("./models/dbConnection");
const express = require("express");
const router = express.Router();

/*

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "memory_lane_db",
};

async function getData() {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const data = await connection.execute(
      "SELECT * FROM users WHERE email='mujo.babajic@gmail.com'"
    );
    console.log(data);
  } catch (err) {
    console.log("error", err);
  } finally {
    connection.end();
  }
}

getData();

*/

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  connection.query(query, [username, password], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

module.exports = router;
