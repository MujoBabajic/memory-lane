const express = require("express");
const router = express.Router();
const timelineController = require("../controllers/timelineController");

// Route for displaying memories of a specific timeline
router.get("/:timelineId", timelineController.getMemories);

module.exports = router;
