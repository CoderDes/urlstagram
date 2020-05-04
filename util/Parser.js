const { chromium } = require("playwright");

class Parser {
  constructor() {
    this.minImgWidth = 0;
    this.minImgSize = 0;
  }
  async parse(url) {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitFor("img");
    return await page.$$("img");
  }
  async getArrayOfSources(handles) {
    const srcPromises = handles.map(handle => {
      return handle.boundingBox().then(result => {
        const { width, height } = result;
        if (width >= this.minImgWidth && height >= this.minImgHeight) {
          return handle.getAttribute("src");
        }
      });
    });
    const arrSources = await Promise.all(srcPromises);
    return arrSources.filter(src => src !== undefined);
  }
  set setMinImgWidth(value) {
    this.minImgWidth = value;
  }
  set setMinImgHeight(value) {
    this.minImgHeight = value;
  }
}

module.exports = Parser;
