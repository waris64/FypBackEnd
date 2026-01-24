import axios from "axios";
import FormData from "form-data";
import fs from "fs";

async function testPrediction() {
  try {
    const url = "http://localhost:8080/api/ai/predict";
    const imagePath = "./real_test_image.png";

    const form = new FormData();
    form.append("image", fs.createReadStream(imagePath));

    console.log("Sending prediction request...");
    const response = await axios.post(url, form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    console.log("Prediction Result:", response.data);
  } catch (error) {
    if (error.response) {
      console.error("Test Failed (Status):", error.response.status);
      console.error("Test Failed (Data):", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("Test Failed:", error.message);
    }
  }
}

testPrediction();
