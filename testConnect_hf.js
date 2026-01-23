import { Client } from "@gradio/client";

async function testConnect() {
  try {
    console.log("Attempting to connect to Gradio...");
    const client = await Client.connect("https://waris786-citrus-disease-detector.hf.space");
    console.log("Connected successfully!");
    console.log("App ID:", client.config.app_id);
  } catch (error) {
    console.error("Connection failed:", error.message);
    if (error.stack) console.error(error.stack);
  }
}

testConnect();
