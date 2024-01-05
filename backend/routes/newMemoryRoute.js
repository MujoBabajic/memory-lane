const express = require("express");
const router = express.Router();
const newMemoryController = require("../controllers/newMemoryController");

router.post("/", newMemoryController.createNewMemory);

module.exports = router;
