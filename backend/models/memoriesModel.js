const db = require("../models/dbConnection");

async function createMemory(timelineId, picture, description) {
  try {
    await db.execute(
      `INSERT INTO memories (timeline_id, picture, memory_description) 
      VALUES (?, ?, ?)`,
      [timelineId, picture, description]
    );
  } catch (err) {
    console.log(err);
  }
}

async function editMemory(description, memoryId) {
  try {
    await db.execute(
      `UPDATE memories SET memory_description = ? 
      WHERE memory_id = ?`,
      [description, memoryId]
    );
  } catch (err) {
    console.log(err);
  }
}

async function deleteMemory(memoryId) {
  try {
    await db.execute(
      `DELETE FROM memories 
    WHERE memory_id = ?`,
      [memoryId]
    );
  } catch (err) {
    console.log(err);
  }
}

async function getMemoryById(memoryId) {
  try {
    const memory = await db.query(
      `SELECT * FROM memories 
      WHERE memory_id = ?`,
      [memoryId]
    );

    const createdAt = new Date(memory[0][0].memory_created_at);
    const editedAt = new Date(memory[0][0].memory_last_edit_at);
    const dateCreatedFormatted = `${createdAt.getDate()}/${
      createdAt.getMonth() + 1
    }/${createdAt.getFullYear()}`;

    const dateEditedFormatted = `${editedAt.getDate()}/${
      editedAt.getMonth() + 1
    }/${editedAt.getFullYear()}`;
    memory[0][0].memory_created_at = dateCreatedFormatted;
    memory[0][0].memory_last_edit_at = dateEditedFormatted;
    return memory;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createMemory,
  editMemory,
  deleteMemory,
  getMemoryById,
};
