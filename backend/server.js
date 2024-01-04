const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const cookieParser = require("cookie-parser");
const authenticateToken = require("./middleware/jwtauth");

const loginRoute = require("./routes/loginRoute");
const registrationRoute = require("./routes/registrationRoute");
const logoutRoute = require("./routes/logoutRoute");
const newTimelineRoute = require("./routes/newTimelineRoute");
const profileRoute = require("./routes/profileRoute");
const timelineRoute = require("./routes/timelineRoute");
const { time } = require("console");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/pages"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend/public")));
app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

app.use("/login", loginRoute);
app.use("/register", registrationRoute);
app.use("/logout", logoutRoute);
app.use("/createnewtimeline", newTimelineRoute);

app.get("*", authenticateToken.checkUser);
app.get("/", (req, res) => {
  if (res.locals.user) res.redirect("/feed");
  else res.render("login", { errors: "" });
});
app.get("/register-page", (req, res) => {
  if (res.locals.user) res.redirect("/feed");
  else res.render("registration", { errors: "" });
});
app.get("/feed", authenticateToken.authenticateToken, (req, res) => {
  res.render("feed");
});

app.use("/profile", profileRoute);

app.get("/editprofile", (req, res) => {
  if (res.locals.user) res.render("edit_profile");
  else res.sendStatus(401);
});

app.use("/timeline", timelineRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
