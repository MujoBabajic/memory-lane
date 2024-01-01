const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const { check, validationResult } = require("express-validator");

router.post(
  "/",
  [
    check("email").isEmail().withMessage("Invalid email format"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  loginController.loginUser
);

module.exports = router;
