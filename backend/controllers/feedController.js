const feedModel = require("../models/feedModel");

async function getMemoriesForFeed(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const memoriesLimit = 10;

    const publicMemories = await feedModel.getPublicMemories(
      page,
      memoriesLimit
    );

    res.render("feed", { publicMemories, currentPage: page });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getMemoriesForFeed };
