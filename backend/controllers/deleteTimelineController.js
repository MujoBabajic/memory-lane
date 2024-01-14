const deleteTimelineModel = require("../models/deleteTimelineModel");

async function deleteTimeline(req, res) {
  try {
    const { timelineId, userId } = req.body;

    await deleteTimelineModel.deleteTimelineFromDb(timelineId);

    res.status(200).redirect(`/profile/${userId}`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { deleteTimeline };
