import express from "express";
dotenv.config();
import dotenv from "dotenv";
import { connection } from "./configs/database.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import profileRoutes from "./routes/profileRoutes.js";
import categoryRouter from "./routes/categoryRoute.js";
import blogRouter from "./routes/blogRoute.js";
import allCountRoute from "./routes/allCountRoute.js";
import wishlistRouter from "./routes/wishlistRoute.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/user", profileRoutes);
app.use("/api/v1/user", wishlistRouter);
app.use("/api/v1/admin", categoryRouter);
app.use("/api/v1/admin", blogRouter);
app.use("/api/v1/admin", allCountRoute);

// Public route
app.use("/api/v1", categoryRouter);
app.use("/api/v1", blogRouter);

connection();
const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`server is running on port : ${port}`);
});
