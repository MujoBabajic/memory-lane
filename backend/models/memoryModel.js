const db = require("./dbConnection");

async function getMemoryById(memoryId) {
  try {
    const memory = await db.query(
      "SELECT * FROM memories WHERE memory_id = ?",
      [memoryId]
    );

    const createdAt = new Date(memory[0][0].created_at);
    const editedAt = new Date(memory[0][0].last_edit_at);
    const dateCreatedFormatted = `${createdAt.getDate()}/${
      createdAt.getMonth() + 1
    }/${createdAt.getFullYear()}`;

    const dateEditedFormatted = `${editedAt.getDate()}/${
      editedAt.getMonth() + 1
    }/${editedAt.getFullYear()}`;
    memory[0][0].created_at = dateCreatedFormatted;
    memory[0][0].last_edit_at = dateEditedFormatted;
    return memory;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getMemoryById };
