const express = require("express");
const router = express.Router();
const deleteMemoryController = require("../controllers/deleteMemoryController");

router.post("/", deleteMemoryController.deleteMemory);

module.exports = router;
