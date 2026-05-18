const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({
        message: "No token, authorization denied"
      });
    }

    // 🔥 FIX: extract token properly
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token missing"
      });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;

    next();

  } catch (error) {
    res.status(401).json({
      message: "Invalid token"
    });
  }
};

const adminMiddleware = (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({
        message: "Access denied. Admin only."
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  authMiddleware,
  adminMiddleware
};