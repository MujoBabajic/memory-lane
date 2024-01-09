const express = require("express");
const router = express.Router();
const memoryController = require("../controllers/memoryController");

router.get("/:memoryId", memoryController.getMemoryById);

module.exports = router;
