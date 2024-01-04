const express = require("express");
const router = express.Router();
const newTimelineController = require("../controllers/newTimelineController");

router.post("/", newTimelineController.createNewTimeline);

module.exports = router;
