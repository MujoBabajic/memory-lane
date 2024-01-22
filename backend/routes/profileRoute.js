const express = require("express");
const router = express.Router();
const timelinesController = require("../controllers/timelinesController");
const profileController = require("../controllers/profileController");

router.get("/search", profileController.searchUsers);
router.get("/:userId", timelinesController.getTimelines);
router.post("/changeavatar", profileController.changeAvatar);
router.post("/editprofile", profileController.editProfile);

module.exports = router;
