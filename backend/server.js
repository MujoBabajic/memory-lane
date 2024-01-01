const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");

const loginRoute = require("./routes/loginRoute");
const registrationRoute = require("./routes/registrationRoute");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend/public")));

app.use("/login", loginRoute);
app.use("/register", registrationRoute);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/pages/login.html"));
});

app.get("/register-page", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/pages/registration.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
