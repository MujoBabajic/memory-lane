const editTimelineModel = require("../models/editTimelineModel");

async function editTimeline(req, res) {
  try {
    const { title, isPrivate, textFont, bgColor, timelineId } = req.body;

    const isPrivateBoolean =
      isPrivate.toLowerCase() === "false" ? false : Boolean(isPrivate);
    await editTimelineModel.updateTimeline(
      title,
      isPrivateBoolean,
      textFont,
      bgColor,
      timelineId
    );
    res.status(200).redirect(`/timeline/${timelineId}`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { editTimeline };
