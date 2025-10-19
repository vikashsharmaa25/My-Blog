import Comment from "../models/comment.js";
import Blog from "../models/blog.js";
import { successResponse, errorResponse } from "../utils/response-handler.js";

// GET: Public - list comments for a blog with pagination
export const getCommentsByBlog = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const blogId = req.params.blogId;

    const blogExists = await Blog.exists({ _id: blogId });
    if (!blogExists) return errorResponse(res, 404, "Blog not found");

    const skip = (Number(page) - 1) * Number(limit);

    const [comments, total] = await Promise.all([
      Comment.find({ blog: blogId })
        .populate("user", "username profilePic")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Comment.countDocuments({ blog: blogId }),
    ]);

    return successResponse(res, 200, "Comments fetched", {
      total,
      count: comments.length,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      comments,
    });
  } catch (error) {
    return errorResponse(res, 500, "Internal server error", error?.message);
  }
};

// POST: Auth - add a comment to a blog
export const addComment = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const { content } = req.body;
    const userId = req.user?._id;

    if (!content || !content.trim()) {
      return errorResponse(res, 400, "Content is required");
    }

    const blog = await Blog.findById(blogId);
    if (!blog) return errorResponse(res, 404, "Blog not found");

    const comment = await Comment.create({ blog: blogId, user: userId, content: content.trim() });
    await comment.populate("user", "username profilePic");

    return successResponse(res, 201, "Comment added", { comment });
  } catch (error) {
    return errorResponse(res, 500, "Internal server error", error?.message);
  }
};

// DELETE: Auth - delete own comment (or admin)
export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const user = req.user; // may be full user in admin middleware, or minimal in auth

    const comment = await Comment.findById(commentId);
    if (!comment) return errorResponse(res, 404, "Comment not found");

    const isOwner = comment.user.toString() === user._id.toString();
    const isAdmin = user.role === "admin";
    if (!isOwner && !isAdmin) return errorResponse(res, 403, "Not allowed");

    await Comment.findByIdAndDelete(commentId);
    return successResponse(res, 200, "Comment deleted");
  } catch (error) {
    return errorResponse(res, 500, "Internal server error", error?.message);
  }
};
