import { Client } from "@gradio/client";
import { ErrorHandler } from "../utils/error.js";
import fs from "fs";

export const predictDisease = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(ErrorHandler(400, "Please upload an image"));
    }

    // Connect to Gradio Space
    const client = await Client.connect("https://waris786-citrus-disease-detector.hf.space");

    // Convert image buffer to Blob (as required by Gradio client)
    const imageBlob = new Blob([req.file.buffer], { type: req.file.mimetype });

    // Predict
    const result = await client.predict("/predict", [ imageBlob ]);

    res.status(200).json({
      success: true,
      prediction: result.data[0],
    });

  } catch (error) {
    console.error("Prediction Error:", error);
    if (error.response) {
      console.error("Gradio Error Detail:", error.response);
    }
    next(ErrorHandler(500, error.message || "Model Prediction Failed"));
  }
};
