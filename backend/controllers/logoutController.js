function logoutUser(req, res) {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
}

module.exports = { logoutUser };
