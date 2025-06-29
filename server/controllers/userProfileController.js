import User from "../models/auth.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : req.params.id;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve user profile" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ success: false, message: "Request body is missing" });
    }

    const { username, email } = req.body;

    if (!username && !email && !req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No fields provided for update" });
    }

    const userId = req.user._id;
    let updatedFields = {};

    if (username) updatedFields.username = username;
    if (email) updatedFields.email = email;
    if (req.file) {
      updatedFields.profilePic = req.file.path;
      updatedFields.publicId = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Profile updated!", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update profile" });
  }
};
