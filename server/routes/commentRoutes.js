import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import {
  getCommentsByBlog,
  addComment,
  deleteComment,
} from "../controllers/commentController.js";

const commentRoutes = express.Router();

// Public: list comments for a blog
commentRoutes.get("/comments/:blogId", getCommentsByBlog);

// Auth: add/delete
commentRoutes.post("/comments/:blogId", authenticateUser, addComment);
commentRoutes.delete("/comments/:commentId", authenticateUser, deleteComment);

export default commentRoutes;
