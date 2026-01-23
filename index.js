import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./route/authRoute.js";
import recordRouter from "./route/router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userModel from "./model/userModel.js";
import { register } from "./controller/authController.js";
import predictRouter from "./route/predictRoute.js";
dotenv.config();

// ✅ Singleton pattern for MongoDB connection
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    console.log("Using cached database connection");
    return cachedDb;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    cachedDb = connection;
    console.log("New database connection established");
    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:process.env.FRONTEND_URL || "http://localhost:8080",
  credentials: true,
}
));
const PORT = 8080 ;

connectToDatabase();

app.listen(PORT, (error) => {
  if (error) {
    console.error("Error while starting the server:", error);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
// Health check 
app.get("/", (req, res) => {
  res.json({
    message: "Hello from the backend!",
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});
app.use("/auth", authRoutes);
app.use("/api/records", recordRouter);
app.use("/api/register",register);
app.use("/api/ai", predictRouter);

app.post("/api/register", (req, res) => {
  userModel
    .create(req.body)
    .then((register) => res.json(register))
    .catch((err) => err.json(err));
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.error("Error : " , message)
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
