import { Client } from "@gradio/client";
import fs from "fs";

async function testGradio() {
  try {
    console.log("Connecting to Gradio...");
    const client = await Client.connect("waris786/citrus-disease-detector");

    const imageBuffer = fs.readFileSync("./test_image.png");
    const imageBlob = new Blob([imageBuffer], { type: "image/png" });

    console.log("Predicting...");
    const result = await client.predict("/predict", { 
      image: imageBlob, 
    });

    console.log("Result:", result.data);
  } catch (error) {
    console.error("Gradio Test Failed:", error);
  }
}

testGradio();
