const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.slice(7);
    try {
      const payload = jwt.verify(token, "backend-secret");
      req.user = payload;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};
