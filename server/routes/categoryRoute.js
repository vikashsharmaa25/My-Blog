import express from "express";
import {
  authenticateAdmin,
  authenticateUser,
} from "../middlewares/authMiddleware.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

// admin route
categoryRouter.post(
  "/create-category",
  authenticateUser,
  authenticateAdmin,
  createCategory
);
categoryRouter.put(
  "/update-category/:id",
  authenticateUser,
  authenticateAdmin,
  updateCategory
);

categoryRouter.delete(
  "/delete-category/:id",
  authenticateUser,
  authenticateAdmin,
  deleteCategory
);

// public route
categoryRouter.get("/category", getCategories);
categoryRouter.get("/category/:id", getCategoryById);

export default categoryRouter;
