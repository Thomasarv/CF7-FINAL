import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    
    const token =
      req.cookies.token ||
      (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      console.log('No token found');
      return res.status(401).json({ message: "User not authenticated", success: false });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded || !decoded.userId) {
      console.log('Invalid token payload');
      return res.status(401).json({ message: "Invalid token", success: false });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};