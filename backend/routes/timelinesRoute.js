const express = require("express");
const router = express.Router();
const timelinesController = require("../controllers/timelinesController");

router.post("/createtimeline", timelinesController.createTimeline);
router.post("/edittimeline", timelinesController.editTimeline);
router.post("/deletetimeline", timelinesController.deleteTimeline);

router.get("/:timelineId", timelinesController.getTimelineMemories);
module.exports = router;
