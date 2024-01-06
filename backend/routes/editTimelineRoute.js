const express = require("express");
const router = express.Router();
const editTimelineController = require("../controllers/editTimelineController");

router.post("/", editTimelineController.editTimeline);

module.exports = router;
