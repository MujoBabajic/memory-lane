const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const db = require("./models/dbConnection");
const bcrypt = require("bcrypt");

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
    const data = await db.execute(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);
    if (!data[0].length) {
      res.status(400).send("User not found");
    } else {
      if (await bcrypt.compare(password, data[0][0].password_hash)) {
        res.status(200).send("Login successful");
      } else {
        res.status(400).send(`Incorrect password`);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500);
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
      const hashedPassword = await bcrypt.hash(password, 10);

      await db.execute(
        `INSERT INTO users (first_name, last_name, date_of_birth, gender, email, password_hash) VALUES (?, ?, ?, ?, ?, ?)`,
        [firstName, lastName, dob, gender, email, hashedPassword]
      );
      res.status(200).send("New user registered");
    }
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
