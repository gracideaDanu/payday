const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("authentication").split(" ")[1];

  if (!token) return res.status(401).json({ message: "Authentication Error. No token found." });

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};

