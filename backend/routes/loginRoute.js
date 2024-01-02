const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const validateLogin = require("../middleware/validateLogin");

router.post("/", validateLogin, loginController.loginUser);

module.exports = router;
