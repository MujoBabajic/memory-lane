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

module.exports = { checkIsOwnProfile };
