const { check, validationResult } = require("express-validator");

const validateRegistration = [
  check("firstname")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must be 2 letters minimum"),
  check("lastname")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Last name must be 2 letters minimum"),

  check("email").isEmail().withMessage("Invalid email format"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

module.exports = validateRegistration;
