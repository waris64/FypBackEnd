import axios from "axios";
import FormData from "form-data";
import fs from "fs";

async function testPrediction() {
  try {
    const url = "http://localhost:8080/api/ai/predict";
    const imagePath = "./test_image.png";

    // Create a dummy image if it doesn't exist (for testing structure)
    if (!fs.existsSync(imagePath)) {
      console.log("Creating dummy test image...");
      fs.writeFileSync(imagePath, "dummy data"); 
    }

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
    console.error("Test Failed:", error.response ? error.response.data : error.message);
  }
}

testPrediction();
