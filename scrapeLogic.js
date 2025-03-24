const puppeteer = require("puppeteer");

async function scrapeLogic(res) {
  try {
    const browser = await puppeteer.launch({
      headless: "true", // Ensures true headless mode
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Required for some environments
    });

    const page = await browser.newPage();
    await page.goto("https://math.prodigygame.com");

    // Take screenshot
    const screenshot = await page.screenshot({ 
      fullPage: true,
      encoding: 'base64'
    });

    await browser.close();

    res.send({ 
      success: true, 
      screenshot: `data:image/png;base64,${screenshot}`
    });
  } catch (error) {
    console.error("Scraping error:", error);
    res.status(500).send({ success: false, error: error.message });
  }
}

module.exports = { scrapeLogic };