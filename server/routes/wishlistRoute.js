import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/add-wishlist/:blogId", authenticateUser, addToWishlist);
wishlistRouter.delete(
  "/remove-wishlist/:blogId",
  authenticateUser,
  removeFromWishlist
);
wishlistRouter.get("/blog-wishlist", authenticateUser, getWishlist);

export default wishlistRouter;
