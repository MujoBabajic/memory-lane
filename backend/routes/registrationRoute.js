const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registrationController");
const { check, validationResult } = require("express-validator");

router.post(
  "/",
  [
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
  ],
  registrationController.registerUser
);

module.exports = router;
