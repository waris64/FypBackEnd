import axios from "axios";
import fs from "fs";

async function saveConfig() {
  try {
    const url = "https://waris786-citrus-disease-detector.hf.space/config";
    const response = await axios.get(url);
    fs.writeFileSync("gradio_config.json", JSON.stringify(response.data, null, 2));
    console.log("Config saved to gradio_config.json");
  } catch (error) {
    console.error("Failed:", error.message);
  }
}

saveConfig();
