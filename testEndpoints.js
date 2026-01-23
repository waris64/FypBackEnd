import axios from "axios";
import fs from "fs";

async function testEndpoints() {
  const endpoints = [
    "/predict",
    "/run/predict",
    "/gradio_api/run/predict"
  ];
  const baseUrl = "https://waris786-citrus-disease-detector.hf.space";
  const imageBuffer = fs.readFileSync("./test_image.png");
  const base64Image = imageBuffer.toString("base64");
  const dataUrl = `data:image/png;base64,${base64Image}`;

  for (const ep of endpoints) {
    try {
      console.log(`Testing ${ep}...`);
      const response = await axios.post(`${baseUrl}${ep}`, {
        data: [dataUrl]
      }, { timeout: 10000 });
      console.log(`${ep} Success!`, response.status);
      console.log("Data:", JSON.stringify(response.data).substring(0, 200));
      return; 
    } catch (error) {
      console.log(`${ep} Failed:`, error.response ? error.response.status : error.message);
    }
  }
}

testEndpoints();
