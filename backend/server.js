const express = require("express");
const app = express();
const ejs = require("ejs");
const PORT = 3000;
const path = require("path");

const loginRoute = require("./routes/loginRoute");
const registrationRoute = require("./routes/registrationRoute");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/pages"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend/public")));

app.use("/login", loginRoute);
app.use("/register", registrationRoute);

app.get("/", (req, res) => {
  res.render("login", { errors: "" });
});

app.get("/register-page", (req, res) => {
  res.render("registration", { errors: "" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
