const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  var token = null
  try {
    token = req.header("authentication").split(" ")[1];
  } catch {
    return res.status(401).json({ message: "No token found." });
  }

  if (!token) return res.status(401).json({ message: "Authentication Error. No token found." });

  try {
    const decoded = jwt.verify(token, "secret");
    req.usermail = decoded.email
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};

