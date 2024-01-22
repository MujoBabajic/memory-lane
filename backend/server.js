const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const cookieParser = require("cookie-parser");
const authenticateToken = require("./middleware/jwtauth");

const authRoute = require("./routes/authRoute");
const feedRoute = require("./routes/feedRoute");
const profileRoute = require("./routes/profileRoute");
const timelinesRoute = require("./routes/timelinesRoute");
const memoriesRoute = require("./routes/memoriesRoute");

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

app.get("*", authenticateToken.checkUser);

app.use("/", authRoute);
app.use("/feed", authenticateToken.authenticateToken, feedRoute);
app.use("/profile", profileRoute);
app.use("/timeline", timelinesRoute);
app.use("/memory", memoriesRoute);

app.get("/", (req, res) => {
  if (res.locals.user) res.redirect("/feed");
  else
    res.render("login", {
      errors: "",
      credentialsError: false,
      userNotFound: false,
    });
});

app.get("/register-page", (req, res) => {
  if (res.locals.user) res.redirect("/feed");
  else res.render("registration", { errors: "", emailExists: false });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
