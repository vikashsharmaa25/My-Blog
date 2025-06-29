import express from "express";

import {
  authenticateAdmin,
  authenticateUser,
} from "../middlewares/authMiddleware.js";
import {
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogBySlug,
  getBlogs,
  updateBlog,
} from "../controllers/blogController.js";
import { upload } from "../configs/cloudinary.js";

const blogRouter = express.Router();

blogRouter.post(
  "/blog-create",
  authenticateUser,
  authenticateAdmin,
  upload.single("blogImage"),
  createBlog
);
blogRouter.put(
  "/update-blog/:id",
  authenticateUser,
  authenticateAdmin,
  upload.single("blogImage"),
  updateBlog
);
blogRouter.delete(
  "/delete-blog/:id",
  authenticateUser,
  authenticateAdmin,
  deleteBlog
);
blogRouter.get("/blog/:id", authenticateUser, authenticateAdmin, getBlogById);

blogRouter.get("/blog", getBlogs);
blogRouter.get("/single-blog/:slug", getBlogBySlug);

export default blogRouter;
