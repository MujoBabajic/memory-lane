const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.get("/:userId", profileController.getTimelines);

module.exports = router;
