class UrlParser {
  url = "https://localhost:3000/url-parse";

  constructor(selector) {
    this.parser = document.querySelector(selector);
    this.input = this.parser.querySelector(".input");
    this.submit = this.parser.querySelector(".button--submit");

    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    fetch(this.url, {
      method: "POST",
      body: JSON.stringify(this.getInputData()),
    });
  }
  getInputData() {
    return this.input.value;
  }
  init() {
    this.submit.addEventListener("click", this.onSubmit);
  }
}

const urlParser = new UrlParser(".url-parser");
urlParser.init();
