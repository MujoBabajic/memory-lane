const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const db = require("./models/dbConnection");

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../frontend/public")));

app.get("/login-page", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/pages/login.html"));
});

app.get("/register-page", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/pages/registration.html"));
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const data = await db.execute(
      `SELECT * FROM users WHERE email = ? AND password_hash = ?`,
      [email, password]
    );
    if (!data[0].length) {
      res.send("User not found");
    } else {
      res.send(`User found: `);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/register", async (req, res) => {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const emailCheck = await db.execute(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);
    if (emailCheck[0].length) {
      res.send("Email already in use");
    } else {
      await db.execute(
        `INSERT INTO users (first_name, last_name, date_of_birth, gender, email, password_hash) VALUES (?, ?, ?, ?, ?, ?)`,
        [firstName, lastName, dob, gender, email, password]
      );
      res.send("New user registered");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
