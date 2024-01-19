const express = require("express");
const router = express.Router();
const memoriesController = require("../controllers/memoriesController");

router.post("/creatememory", memoriesController.createMemory);
router.post("/editmemory", memoriesController.editMemory);
router.post("/deletememory", memoriesController.deleteMemory);

router.get("/:memoryId", memoriesController.getMemoryById);
module.exports = router;
