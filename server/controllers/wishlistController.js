import Blog from "../models/blog.js";
import User from "../models/auth.js";

export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const blogId = req.params.blogId;

    const user = await User.findById(userId);
    const blog = await Blog.findById(blogId);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (user.wishlist.includes(blogId)) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    user.wishlist.push(blogId);
    blog.wishlistBy.push(userId);

    await user.save();
    await blog.save();

    res.status(200).json({ success: true, message: "Added to wishlist", blog });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const blogId = req.params.blogId;

    const user = await User.findById(userId);
    const blog = await Blog.findById(blogId);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    user.wishlist = user.wishlist.filter((id) => id.toString() !== blogId);
    blog.wishlistBy = blog.wishlistBy.filter((id) => id.toString() !== userId);

    await user.save();
    await blog.save();

    res.status(200).json({ success: true, message: "Removed from wishlist" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate({
      path: "wishlist",
      populate: {
        path: "category",
        select: "name description slug isActive",
      },
    });

    res.status(200).json({
      success: true,
      message: "Wishlist fetched successfully",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
