async function testFetch() {
  try {
    const url = "https://waris786-citrus-disease-detector.hf.space/config";
    console.log("Fetching with native fetch...");
    const response = await fetch(url);
    console.log("Status:", response.status);
    const data = await response.json();
    console.log("Data keys:", Object.keys(data));
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

testFetch();
