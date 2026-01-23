import axios from "axios";

async function checkUrl() {
  try {
    const url = "https://waris786-citrus-disease-detector.hf.space/config";
    console.log("Fetching config from:", url);
    const response = await axios.get(url);
    console.log("Config Status:", response.status);
    console.log("Dependencies:", JSON.stringify(response.data.dependencies, null, 2));
  } catch (error) {
    console.error("Axios Fetch Failed:", error.message);
    if (error.response) {
       console.error("Response:", error.response.status, error.response.data);
    }
  }
}

checkUrl();
