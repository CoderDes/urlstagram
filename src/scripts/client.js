class UrlParser {
  url = "http://localhost:3000/url-parse";

  constructor(selector) {
    this.parser = document.querySelector(selector);
    this.input = this.parser.querySelector(".input");
    this.submit = this.parser.querySelector(".button--submit");

    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();

    fetch(this.url, {
      method: "POST",
      body: JSON.stringify({ url: this.getInputData() }),
      headers: {
        "Content-type": "application/json",
      },
    }).catch(err => console.error(err));
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
