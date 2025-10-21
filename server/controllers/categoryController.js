import Blog from "../models/blog.js";
import Category from "../models/category.js";
import { cloudinary } from "../configs/cloudinary.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const newCategory = new Category({
      name,
      description,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    });

    if (req.file) {
      newCategory.categoryImage = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }

    await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });

    if (!categories) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (name && name !== category.name) {
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: "Category name already exists",
        });
      }
      category.name = name;
    }

    if (description !== undefined) category.description = description;
    if (isActive !== undefined) category.isActive = isActive;

    // Handle image update
    if (req.file) {
      // delete old image if present
      if (category.categoryImage?.publicId) {
        try {
          await cloudinary.uploader.destroy(category.categoryImage.publicId);
        } catch (_) {}
      }
      category.categoryImage = {
        url: req.file.path,
        publicId: req.file.filename,
      };
    }

    await category.save();

    res.status(201).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    const blogsCount = await Blog.countDocuments({ category: req.params.id });

    if (blogsCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category. It is being used by ${blogsCount} blog(s)`,
      });
    }

    // delete image from cloudinary if present
    if (category.categoryImage?.publicId) {
      try {
        await cloudinary.uploader.destroy(category.categoryImage.publicId);
      } catch (_) {}
    }

    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
