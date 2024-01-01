const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const loginModel = require("../models/loginModel");

async function loginUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("login", { errors: errors.mapped() });
  }

  const { email, password } = req.body;

  try {
    const userData = await loginModel.getUserByEmail(email);

    if (!userData || userData.length === 0) {
      return res.status(400).send("User not found");
    }

    const passwordMatch = await bcrypt.compare(
      password,
      userData[0].password_hash
    );

    if (passwordMatch) {
      return res.status(200).send("Login successful");
    } else {
      return res.status(400).send("Incorrect email or password");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
}

module.exports = {
  loginUser,
};
