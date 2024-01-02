const { check, validationResult } = require("express-validator");

const validateLogin = [
  check("email").isEmail().withMessage("Invalid email format"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

module.exports = validateLogin;
