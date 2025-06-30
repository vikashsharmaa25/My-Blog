import bcrypt from "bcrypt";
import User from "../models/auth.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../libs/tokens.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    let profilePicUrl = "";
    let publicId = "";

    if (req.file) {
      profilePicUrl = req.file.path;
      publicId = req.file.filename;
    }

    // Create and save new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      profilePic: profilePicUrl,
      publicId: publicId || undefined,
    });

    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to register user",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: "Login successful!",
      user: userResponse,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};

// Refresh token endpoint
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res
        .status(403)
        .json({ success: false, message: "Refresh token missing" });
    }

    const decoded = verifyRefreshToken(refreshToken);

    const user = await User.findById(decoded._id);
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "User not found" });
    }

    const newAccessToken = generateAccessToken(user);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    console.error("Refresh token error:", error);
    res
      .status(403)
      .json({ success: false, message: "Invalid or expired refresh token" });
  }
};

// Logout endpoint
export const logoutUser = (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};
