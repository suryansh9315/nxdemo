const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get token from the 'Authorization' header

  console.log("Token:", token); // Log the token for debugging

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token verification error:", err.message);
      return res
        .status(401)
        .json({ message: "Unauthorized", error: err.message });
    }
    req.user = decoded; // Attach the decoded user information to the request
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authMiddleware;

const verifyTokenAndRefresh = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  console.log("Access Token:", accessToken);
  console.log("Refresh Token:", refreshToken);

  if (accessToken) {
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("Access Token verification failed:", err.message);

        if (refreshToken) {
          return handleRefreshToken(req, res, refreshToken, next); // Pass next to the handler
        } else {
          return res.status(403).json({
            message: "Invalid or expired access token and no refresh token",
          });
        }
      }

      console.log("Access Token verified:", decoded);
      req.user = decoded;
      return next();
    });
  } else {
    if (refreshToken) {
      console.log("Access Token missing, checking Refresh Token...");
      return handleRefreshToken(req, res, refreshToken, next); // Pass next to the handler
    } else {
      return res.status(401).json({ message: "No tokens provided" });
    }
  }
};
const handleRefreshToken = (req, res, refreshToken, next) => {
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Refresh Token verification failed:", err.message);
      return res
        .status(403)
        .json({ message: "Invalid or expired refresh token" });
    }

    const newAccessToken = jwt.sign(
      { email: decoded.email, userId: decoded.userId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRE_IN }
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000, // 1 hour
      sameSite: "Strict",
    });

    req.user = decoded;

    // Explicitly call next() to proceed
    return next();
  });
};

module.exports = { verifyTokenAndRefresh, authMiddleware };
