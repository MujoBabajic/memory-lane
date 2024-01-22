const jwt = require("jsonwebtoken");
const multer = require("multer");
const profileModel = require("../models/profileModel");
require("dotenv").config();
const authModel = require("../models/authModel");
const bcrypt = require("bcrypt");

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

async function searchUsers(req, res) {
  try {
    const { userName } = req.query;
    const usersData = await profileModel.getUsersForSearch(userName);

    res.render("search", { usersData });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

async function editProfile(req, res) {
  try {
    const { firstName, lastName, dob, gender, password, email } = req.body;
    const userData = await authModel.getUserByEmail(email);

    let hashedPassword;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await profileModel.editProfile(
      firstName,
      lastName,
      dob,
      gender,
      hashedPassword,
      userData[0].user_id
    );

    if (hashedPassword) {
      const accessToken = jwt.sign(
        { userId: userData[0].user_id, userEmail: email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("jwt", accessToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.redirect(`/profile/${userData[0].user_id}`);
    } else {
      res.redirect(`/profile/${userData[0].user_id}`);
    }
  } catch (err) {
    console.log(err);
  }
}
module.exports = { changeAvatar, checkIsOwnProfile, searchUsers, editProfile };
