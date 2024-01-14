const timelineModel = require("../models/getTimelinesModel");
const jwt = require("jsonwebtoken");

function checkIsOwnProfile(token, userId) {
  let loggedInUserId = null;

  if (token) {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    loggedInUserId = decodedToken.userId;
  }
  const isOwnProfile = loggedInUserId == userId;
  return isOwnProfile;
}

async function getTimelines(req, res) {
  try {
    const { userId } = req.params;

    const timelinesData = await timelineModel.getTimelinesForUser(userId);
    const userData = await timelineModel.getUserById(userId);
    const isOwnProfile = checkIsOwnProfile(req.cookies.jwt, userId);

    res.render("profile", { timelinesData, userData, isOwnProfile });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { getTimelines, checkIsOwnProfile };
