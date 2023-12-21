// routes/index.js
const express = require("express");
const router = express.Router();
const db = require("../models/dbConnection");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (rows.length === 0) {
      res.send("No user found");
    } else {
      const user = rows[0];

      if (user.password !== password) {
        res.send("Incorrect password");
      } else {
        res.redirect("/feed.html");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
