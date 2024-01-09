const express = require("express");
const router = express.Router();
const timelineController = require("../controllers/timelineController");

router.get("/:timelineId", timelineController.getMemories);

module.exports = router;
