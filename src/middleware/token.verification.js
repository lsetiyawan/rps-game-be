const config = require("../config/config.json");
const jwt = require("jsonwebtoken");

const tokenVerification = async (req, res, next) => {
  // mengambil token yang ada di dalam header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Missing Authorization header");
  }

  try {
    // cek token dan masukkan data user dalam request
    const user = await jwt.verify(token, config.jwt_secret_token);
    req.auth = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = tokenVerification;
