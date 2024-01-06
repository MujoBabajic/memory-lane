const express = require("express");
const router = express.Router();
const deleteTimelineController = require("../controllers/deleteTimelineController");

router.post("/", deleteTimelineController.deleteTimeline);

module.exports = router;
