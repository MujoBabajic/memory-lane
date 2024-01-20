const jwt = require("jsonwebtoken");
const multer = require("multer");
const profileModel = require("../models/profileModel");

// Set storage for uploaded files
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage: storage }).single("picture"); // 'picture' should match the name attribute in your HTML form

function changeAvatar(req, res) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedToken) => {
        try {
          upload(req, res, async function (err) {
            if (err) {
              console.log(err);
              return res.status(500).send("Error uploading");
            }
            const { buffer: pictureBuffer, originalname } = req.file;

            const picture = {
              data: pictureBuffer.toString("base64"),
              contentType: originalname.split(".").pop(),
            };

            await profileModel.changeAvatar(picture.data, decodedToken.userId);

            res.status(201).redirect(`/profile/${decodedToken.userId}`);
          });
        } catch (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        }
      }
    );
  }
}

function checkIsOwnProfile(token, userId) {
  let loggedInUserId = null;

  if (token) {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    loggedInUserId = decodedToken.userId;
  }
  const isOwnProfile = loggedInUserId == userId;
  return isOwnProfile;
}

module.exports = { changeAvatar, checkIsOwnProfile };
