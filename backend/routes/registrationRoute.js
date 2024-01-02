const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registrationController");
const validateRegistration = require("../middleware/validateRegistration");

router.post("/", validateRegistration, registrationController.registerUser);

module.exports = router;
