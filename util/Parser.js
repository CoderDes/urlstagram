const { chromium } = require("playwright");

class Parser {
  async parse(url) {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitFor("img");
    return await page.$$("img");
  }
}

module.exports = Parser;
