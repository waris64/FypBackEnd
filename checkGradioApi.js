import { Client } from "@gradio/client";

async function checkApi() {
  try {
    console.log("Connecting to Gradio...");
    const client = await Client.connect("https://waris786-citrus-disease-detector.hf.space");
    console.log("Config:", JSON.stringify(client.config, null, 2));
  } catch (error) {
    console.error("Failed to connect:", error);
  }
}

checkApi();
