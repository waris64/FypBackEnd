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
  if (cachedDb && mongoose.connection.readyState === 1) {
    console.log("Using cached database connection");
    return cachedDb;
  }

  if (!process.env.MONGO) {
    console.error("MONGO environment variable is missing");
    throw new Error("MONGO environment variable is missing");
  }

  try {
    console.log("Attempting new database connection...");
    const connection = await mongoose.connect(process.env.MONGO, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    cachedDb = connection;
    console.log("New database connection established");
    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    // Don't throw here to allow the app to start and respond with errors
    return null;
  }
}

const app = express();
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "https://fyp-front-end-theta.vercel.app",
  "https://fyp-front-end-theta.vercel.app/",
  "http://localhost:5173",
  "http://localhost:8080"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      console.log("Origin not allowed by CORS:", origin);
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
}
));
const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, (error) => {
    if (error) {
      console.error("Error while starting the server:", error);
    } else {
      console.log(`Server is running on port ${PORT}`);
    }
  });
}

export default app;
// Health check 
app.get("/", (req, res) => {
  res.json({
    message: "Hello from the backend!",
    status: "healthy",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV
  });
});

app.get("/status", async (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMap = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting"
  };
  
  res.json({
    database: statusMap[dbStatus] || "unknown",
    readyState: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    await connectToDatabase();
  }
  next();
});
app.use("/auth", authRoutes);
app.use("/api/records", recordRouter);
app.use("/api/ai", predictRouter);

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
