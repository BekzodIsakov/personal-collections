const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const checkAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "SecretKey");
    const user = await User.findOne({
      _id: decoded.id,
      "tokens.token": token,
    });

    if (!user) throw new Error("User is not authenticated!");
    if (user.isBlocked) throw new Error("User is blocked!");
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

module.exports = checkAuth;
