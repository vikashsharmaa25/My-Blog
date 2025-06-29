import express from "express";
import { allCountData, allUser } from "../controllers/allCountsController.js";
import {
  authenticateAdmin,
  authenticateUser,
} from "../middlewares/authMiddleware.js";

const allCountRoute = express.Router();

allCountRoute.get(
  "/allcount",
  authenticateUser,
  authenticateAdmin,
  allCountData
);

allCountRoute.get("/alluser", authenticateUser, authenticateAdmin, allUser);

export default allCountRoute;
