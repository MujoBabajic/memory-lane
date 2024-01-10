const express = require("express");
const router = express.Router();
const editMemoryController = require("../controllers/editMemoryController");

router.post("/", editMemoryController.editMemory);

module.exports = router;
