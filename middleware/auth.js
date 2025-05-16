const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json("Token is not valid!");
      req.user = user; // Pass user info to the next middleware/route
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

// Optional: to restrict admin-only routes
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Admin access required!");
    }
  });
};

module.exports = { verifyToken, verifyAdmin };
