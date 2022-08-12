const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY_ACCESS);
    req.user.jwt = decoded;
    // console.log(decoded);
  } catch (err) {

    return res.status(401).json({ status: "Invalid Token" });

  }
  return next();
};

module.exports = verifyToken;