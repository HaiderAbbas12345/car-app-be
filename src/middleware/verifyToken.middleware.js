const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const validateJWT = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({
      status: false,
      message: "Access token is required for authentication",
    });
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({
      status: false,
      message: "Session expired please login again",
      error: err.message,
    });
  } finally {
    return next();
  }
};

module.exports = validateJWT;
