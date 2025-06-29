import express from "express";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/userProfileController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { upload } from "../configs/cloudinary.js";

const profileRoutes = express.Router();

profileRoutes.get("/profile", authenticateUser, getUserProfile);
profileRoutes.put(
  "/profile/update",
  authenticateUser,
  upload.single("profilePic"),
  updateUserProfile
);

export default profileRoutes;
