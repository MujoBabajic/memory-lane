const jwt = require("jsonwebtoken");
const authModel = require("../models/authModel");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          try {
            let user = await authModel.getUserByEmail(decodedToken.userEmail);
            res.locals.user = user;
            next();
          } catch (err) {
            console.log(err);
          }
        }
      }
    );
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { authenticateToken, checkUser };
