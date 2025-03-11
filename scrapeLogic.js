const puppeteer = require("puppeteer");

const launchBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: false, // Opens an interactive window
    args: [
      "--start-maximized" // Opens the browser maximized
    ],
  });

  try {
    const page = await browser.newPage();
    await page.goto("https://math.prodigygame.com", { waitUntil: "networkidle2" });
    console.log("Opened math.prodigygame.com in an interactive Chrome window.");
  } catch (e) {
    console.error("Error launching page:", e);
  }
};

launchBrowser();
