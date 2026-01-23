import axios from "axios";
import fs from "fs";

async function testDirect() {
  try {
    const url = "https://waris786-citrus-disease-detector.hf.space/gradio_api/predict";
    const imageBuffer = fs.readFileSync("./test_image.png");
    const base64Image = imageBuffer.toString("base64");
    const dataUrl = `data:image/png;base64,${base64Image}`;

    console.log("Sending direct POST to Gradio...");
    const response = await axios.post(url, {
      data: [dataUrl],
      fn_index: 2 // Based on config, predict is dependencies[2]
    });

    console.log("Response:", JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error("Direct Test Failed:", error.message);
    if (error.response) {
      console.error("Response Data:", error.response.data);
    }
  }
}

testDirect();
