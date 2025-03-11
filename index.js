const express = require("express");
const puppeteer = require("puppeteer-core");

const app = express();
const PORT = process.env.PORT || 10000; // Render assigns a port dynamically

async function startBrowser() {
    const browser = await puppeteer.launch({
        headless: 'new', // Ensures it runs in headless mode
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-gpu",
            "--disable-dev-shm-usage",
            "--single-process"
        ],
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || "/usr/bin/google-chrome-stable"
    });

    return browser;
}

// API Route to Perform Puppeteer Actions
app.get("/screenshot", async (req, res) => {
    try {
        const url = req.query.url;
        if (!url) {
            return res.status(400).json({ error: "Missing URL parameter" });
        }

        const browser = await startBrowser();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "load" });

        const screenshot = await page.screenshot({ encoding: "base64" });
        await browser.close();

        res.json({ screenshot: `data:image/png;base64,${screenshot}` });
    } catch (error) {
        console.error("Puppeteer error:", error);
        res.status(500).json({ error: "Failed to take screenshot" });
    }
});

app.get("/", (req, res) => {
    res.send("Render Puppeteer Server is Running!");
});

// Start Express Server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
