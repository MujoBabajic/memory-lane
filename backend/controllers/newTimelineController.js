const jwt = require("jsonwebtoken");
const newTimelineModel = require("../models/newTimelineModel");

function createNewTimeline(req, res) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedToken) => {
        try {
          const email = decodedToken.userEmail;
          newTimelineModel.createTimeline({
            title: req.body.title,
            isPrivate: req.body.isPrivate,
            email: email,
          });
          res.status(201).send("Timeline created");
        } catch (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        }
      }
    );
  }
}

module.exports = { createNewTimeline };
