const express = require("express");
const router = express.Router();
const validateLogin = require("../middleware/validateLogin");
const validateRegistration = require("../middleware/validateRegistration");
const authController = require("../controllers/authController");

router.post("/login", validateLogin, authController.loginUser);
router.get("/logout", authController.logoutUser);
router.post("/register", validateRegistration, authController.registerUser);

module.exports = router;
