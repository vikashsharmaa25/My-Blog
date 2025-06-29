import User from "../models/auth.js";
import Blog from "../models/blog.js";
import Category from "../models/category.js";

export const allCountData = async (req, res) => {
  try {
    const [userCount, blogCount, categoryCount] = await Promise.all([
      User.countDocuments(),
      Blog.countDocuments(),
      Category.countDocuments(),
    ]);

    return res.status(200).json({
      success: "true",
      message: "all count get successfully",
      allCount: {
        users: userCount,
        blogs: blogCount,
        categories: categoryCount,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "somthing went wrong",
    });
  }
};

export const allUser = async (req, res) => {
  try {
    const allUser = await User.find({ role: { $ne: "admin" } }).select(
      "-password"
    );
    if (!allUser) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "all user get successfully",
      allUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "somthing went wrong",
    });
  }
};
