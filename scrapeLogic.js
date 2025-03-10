const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });

  try {
    const page = await browser.newPage();
    await page.goto("https://blooketbot.glitch.me");

    // Wait for elements to load
    await page.waitForSelector("#gcode");
    await page.waitForSelector("#gname");

    // Wait for any additional element that might be required (e.g., the 'join' button or confirmation)
    await page.waitForSelector("#joinButton"); // Assuming there's a button with id 'joinButton'

    // Run JavaScript in the browser context to fill out the form
    await page.evaluate(() => {
      document.querySelector("#gcode").value = "1248364"; // Set the game code
      document.querySelector("#gname").value = "sam";    // Set the username
      join(); // Run the join function
    });

    // Respond with a confirmation message
    const logStatement = "Successfully joined the game with code 1248364 and name 'sam'.";
    console.log(logStatement);
    res.send(logStatement);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
