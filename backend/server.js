const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const db = require("./models/dbConnection");
const bcrypt = require("bcrypt");

const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend/public")));

app.use("/login", loginRoute);
app.use("/register", registerRoute);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/pages/login.html"));
});

app.get("/register-page", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/pages/registration.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
