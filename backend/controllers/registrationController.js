const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const registrationModel = require("../models/registrationModel");

async function registerUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .render("registration", { errors: errors.mapped(), emailExists: false });
  }

  const { firstname, lastname, dob, gender, email, password } = req.body;

  try {
    const emailExists = await registrationModel.checkIfEmailExists(email);

    if (emailExists) {
      return res
        .status(409)
        .render("registration", { errors: "", emailExists });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await registrationModel.createUser({
      firstName: firstname,
      lastName: lastname,
      dob: dob,
      gender: gender,
      email: email,
      hashedPassword: hashedPassword,
    });

    return res.status(200).render("registrationSuccess");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
}

module.exports = {
  registerUser,
};
