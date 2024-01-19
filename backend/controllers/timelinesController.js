const jwt = require("jsonwebtoken");
const timelinesModel = require("../models/timelinesModel");
const profileController = require("./profileController");
const authModel = require("../models/authModel");

function createTimeline(req, res) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedToken) => {
        try {
          const email = decodedToken.userEmail;
          timelinesModel.createTimeline({
            title: req.body.title,
            isPrivate: req.body.isPrivate,
            email: email,
          });

          res.status(201).redirect(`/profile/${decodedToken.userId}`);
        } catch (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        }
      }
    );
  }
}

async function editTimeline(req, res) {
  try {
    const { title, isPrivate, textFont, bgColor, timelineId } = req.body;

    const isPrivateBoolean =
      isPrivate.toLowerCase() === "false" ? false : Boolean(isPrivate);
    await timelinesModel.editTimeline(
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

async function deleteTimeline(req, res) {
  try {
    const { timelineId, userId } = req.body;

    await timelinesModel.deleteTimeline(timelineId);

    res.status(200).redirect(`/profile/${userId}`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

async function getTimelines(req, res) {
  try {
    const { userId } = req.params;

    const timelinesData = await timelinesModel.getTimelinesForUser(userId);
    const userData = await authModel.getUserById(userId);
    const isOwnProfile = profileController.checkIsOwnProfile(
      req.cookies.jwt,
      userId
    );

    res.render("profile", { timelinesData, userData, isOwnProfile });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

async function getTimelineMemories(req, res) {
  const { timelineId } = req.params;

  try {
    const memories = await timelinesModel.getMemoriesForTimeline(timelineId);
    const timelineStyles = await timelinesModel.getTimelineStyleData(
      timelineId
    );
    const timelineVisitsData = await timelinesModel.getTimelineVisitsCount(
      timelineId
    );
    const timelineVisitsCount = timelineVisitsData[0][0].visitCount;

    const userData = await authModel.getUserById(timelineStyles[0][0].user_id);
    const isOwnProfile = profileController.checkIsOwnProfile(
      req.cookies.jwt,
      userData[0].user_id
    );

    if (!isOwnProfile) {
      const userId = res.locals.user[0].user_id;
      await timelinesModel.registerTimelineVisit(timelineId, userId);
    }

    res.render("timeline", {
      timelineId,
      memories,
      timelineStyles,
      userData,
      isOwnProfile,
      timelineVisitsCount,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  createTimeline,
  editTimeline,
  deleteTimeline,
  getTimelines,
  getTimelineMemories,
};
