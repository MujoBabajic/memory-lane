const db = require("./dbConnection");

async function getPublicMemories(page, limit) {
  try {
    const offset = (page - 1) * limit;

    const data = await db.execute(
      `
    SELECT m.*, t.*, u.*
    FROM memories m
    INNER JOIN timelines t ON m.timeline_id = t.timeline_id
    INNER JOIN users u ON t.user_id = u.user_id
    WHERE t.is_private = 0
    ORDER BY m.memory_created_at DESC
    LIMIT ${offset}, ${limit};
    `
    );

    data[0].forEach((memory) => {
      const createdAt = new Date(memory.memory_created_at);
      const editedAt = new Date(memory.memory_last_edit_at);
      const dateCreatedFormatted = `${createdAt.getDate()}/${
        createdAt.getMonth() + 1
      }/${createdAt.getFullYear()}`;

      const dateEditedFormatted = `${editedAt.getDate()}/${
        editedAt.getMonth() + 1
      }/${editedAt.getFullYear()}`;
      memory.memory_created_at = dateCreatedFormatted;
      memory.memory_last_edit_at = dateEditedFormatted;
    });

    return data;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getPublicMemories };
