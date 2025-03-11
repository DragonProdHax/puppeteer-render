const puppeteer = require("puppeteer");

async function scrapeLogic(res) {
  try {
    const browser = await puppeteer.launch({
      headless: "new", // Ensures true headless mode
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Required for some environments
    });

    const page = await browser.newPage();
    await page.goto("https://math.prodigygame.com");

    // Example: Extract page title
    const title = await page.title();

    await browser.close();

    res.send({ success: true, title });
  } catch (error) {
    console.error("Scraping error:", error);
    res.status(500).send({ success: false, error: error.message });
  }
}

module.exports = { scrapeLogic };
