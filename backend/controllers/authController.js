const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authModel = require("../models/authModel");

async function loginUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("login", {
      errors: errors.mapped(),
      credentialsError: false,
      userNotFound: false,
    });
  }

  try {
    const { email, password } = req.body;
    const userData = await authModel.getUserByEmail(email);

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

function logoutUser(req, res) {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
}

async function registerUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .render("registration", { errors: errors.mapped(), emailExists: false });
  }

  const { firstname, lastname, dob, gender, email, password } = req.body;

  try {
    const emailExists = await authModel.checkIfEmailExists(email);

    if (emailExists) {
      return res
        .status(409)
        .render("registration", { errors: "", emailExists });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await authModel.createUser({
      firstName: firstname,
      lastName: lastname,
      dob: dob,
      gender: gender,
      email: email,
      hashedPassword: hashedPassword,
    });

    res.status(200).render("registrationSuccess");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
}

module.exports = { loginUser, logoutUser, registerUser };
