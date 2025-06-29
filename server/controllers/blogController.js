import Blog from "../models/blog.js";
import Category from "../models/category.js";
import { cloudinary } from "../configs/cloudinary.js";
import { errorResponse, successResponse } from "../utils/response-handler.js";
import Wishlist from "../models/wishlist.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content, category, tags, isPublished, isfeatured } =
      req.body;

    // Verify category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return errorResponse(res, 400, "Invalid category");
    }

    // const sanitizedContent = sanitizeContent(content);

    let blogImage = [];

    if (req.file) {
      blogImage.push({
        url: req.file.path,
        publicId: req.file.filename,
      });
    }

    const newBlog = new Blog({
      title,
      content,
      category,
      tags,
      isPublished: isPublished !== undefined ? isPublished : true,
      isfeatured: isfeatured !== undefined ? isfeatured : true,
      blogImage,
    });

    await newBlog.save();
    await newBlog.populate("category", "name slug");

    return successResponse(res, 201, "Blog created successfully", {
      blog: newBlog,
    });
  } catch (error) {
    return errorResponse(res, 500, "Internal server error", error);
  }
};

export const getBlogs = async (req, res) => {
  try {
    const { page, limit, category, search, published } = req.query;

    const userId = req.user?._id;
    const skip = (page - 1) * limit;

    // Build query
    const query = {};
    if (category) query.category = category;
    if (published !== undefined) query.isPublished = published === "true";
    if (search) query.$text = { $search: search };

    // Fetch blogs
    const blogs = await Blog.find(query)
      .populate("category", "name slug")
      .sort({ publishedDate: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const total = await Blog.countDocuments(query);

    // Get wishlist blog IDs for current user (if logged in)
    const wishlist = userId
      ? await Wishlist.findOne({ userId }).select("blogs").lean()
      : null;

    const wishlistIds = new Set(
      wishlist?.blogs?.map((id) => id.toString()) || []
    );

    console.log("wishlist", wishlist);

    // Attach isInWishlist flag
    const blogsWithFlags = blogs.map((blog) => ({
      ...blog,
      isInWishlist: wishlistIds.has(blog._id.toString()),
    }));

    return successResponse(res, 200, "Blogs fetched successfully", {
      total,
      count: blogsWithFlags.length,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      blogs: blogsWithFlags,
    });
  } catch (error) {
    return errorResponse(res, 500, "Internal server error", error);
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "category",
      "name slug description"
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    errorResponse(res, 500, "Internal server error", error);
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const userId = req.user?._id;
    const blog = await Blog.findOne({ slug: req.params.slug }).populate(
      "category",
      "name slug description"
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Increment views
    if (userId && !blog.viewedBy.includes(userId)) {
      blog.views += 1;
      blog.viewedBy.push(userId);
      await blog.save();
    }

    return successResponse(res, 200, "blog get successfully", {
      blog,
    });
  } catch (error) {
    return errorResponse(res, 500, "Internal server error", error.message);
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, content, category, tags, isPublished } = req.body;

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return errorResponse(res, 404, "Blog not found");
    }

    // Verify category if provided
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return errorResponse(res, 400, "Invalid category");
      }
      blog.category = category;
    }

    // Update fields
    if (title) blog.title = title;
    if (content) blog.content = content;
    if (tags) blog.tags = tags;
    if (isPublished !== undefined) blog.isPublished = isPublished;

    // Handle image update
    if (req.file) {
      // Delete old image from Cloudinary if it exists
      if (blog.blogImage.length > 0) {
        await cloudinary.uploader.destroy(blog.blogImage[0].publicId);
      }

      // Add new image
      blog.blogImage = [
        {
          url: req.file.path,
          publicId: req.file.filename,
        },
      ];
    }

    await blog.save();
    await blog.populate("category", "name slug");

    return successResponse(res, 200, "Blog updated successfully", {
      blog,
    });
  } catch (error) {
    return errorResponse(res, 500, "Internal server error", error.message);
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (
      blog.blogImage &&
      Array.isArray(blog.blogImage) &&
      blog.blogImage.length > 0 &&
      blog.blogImage[0].publicId
    ) {
      await cloudinary.uploader.destroy(blog.blogImage[0].publicId);
    }

    // Remove blog from database
    await Blog.findByIdAndDelete(req.params.id);

    successResponse(res, 200, "Blog deleted successfully!");
  } catch (error) {
    errorResponse(res, 500, "Internal server error", error.message);
  }
};
