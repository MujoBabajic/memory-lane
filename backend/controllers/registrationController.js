const bcrypt = require("bcrypt");
const registrationModel = require("../models/registrationModel");

async function registerUser(req, res) {
  const { firstname, lastname, dob, gender, email, password } = req.body;

  try {
    const emailExists = await registrationModel.checkIfEmailExists(email);

    if (emailExists) {
      return res.send("Email already in use");
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

    return res.status(200).send("New user registered");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
}

module.exports = {
  registerUser,
};
