const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const loginModel = require("../models/loginModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

async function loginUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .render("login", {
        errors: errors.mapped(),
        credentialsError: false,
        userNotFound: false,
      });
  }

  const { email, password } = req.body;

  try {
    const userData = await loginModel.getUserByEmail(email);

    if (!userData || userData.length === 0) {
      return res.status(400).render("login", {
        errors: "",
        userNotFound: true,
        credentialsError: false,
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      userData[0].password_hash
    );

    if (passwordMatch) {
      const accessToken = jwt.sign(
        { userId: userData[0].user_id, userEmail: email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("jwt", accessToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.redirect("/feed");
    } else {
      return res.status(400).render("login", {
        errors: "",
        credentialsError: true,
        userNotFound: false,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
}

module.exports = {
  loginUser,
};
