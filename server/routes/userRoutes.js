import express from "express";
import {
  loginUser,
  refreshToken,
  registerUser,
} from "../controllers/authController.js";
import { upload } from "../configs/cloudinary.js";

const userRoutes = express.Router();

userRoutes.post("/register", upload.single("profilePic"), registerUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/refresh-token", refreshToken);

export default userRoutes;
