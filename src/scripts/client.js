class GalleryRenderer {
  constructor() {
    this.gallery = document.getElementById("gallery");
  }
  renderImages(srcArr) {
    let newGalleryHtml = "";
    for (const src of srcArr) {
      newGalleryHtml += `<li><img src="${src}"></li>`;
    }

    this.gallery.innerHTML = newGalleryHtml;
  }
}

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

    fetch(`${this.url}?url=${this.getInputData()}`)
      .then(res => res.json())
      .then(data => {
        const { imgSources } = data;
        const renderer = new GalleryRenderer();
        renderer.renderImages(imgSources);
      })
      .catch(err => console.error(err));
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
