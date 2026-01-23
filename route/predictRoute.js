import express from "express";
import multer from "multer";
import { predictDisease } from "../controller/predictController.js";

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit 5MB
});

// Route for prediction
router.post("/predict", upload.single("image"), predictDisease);

export default router;
