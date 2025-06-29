import dotenv from "dotenv";
dotenv.config();
import User from "../models/auth.js";
import { verifyAccessToken } from "../libs/tokens.js";

// Middleware to authenticate user
export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// Middleware to authenticate admin user only
export const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = verifyAccessToken(token);

    // Check if user exists and is admin
    const user = await User.findById(decoded._id);
    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. Admins only." });
    }

    req.user = user; // attach full user object
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: "Access denied" });
  }
};
