const timelineModel = require("../models/getTimelinesModel");
const jwt = require("jsonwebtoken");

function getTimelines(req, res) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedToken) => {
        try {
          const email = decodedToken.userEmail;
          const data = await timelineModel.getTimelinesForUser(email);

          res.render("profile", { data });
        } catch (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        }
      }
    );
  }
}

module.exports = { getTimelines };
