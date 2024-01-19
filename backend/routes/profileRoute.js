const express = require("express");
const router = express.Router();
const timelinesController = require("../controllers/timelinesController");

router.get("/:userId", timelinesController.getTimelines);

module.exports = router;
