// class GalleryRenderer {
//   constructor() {
//     this.gallery = document.getElementById("gallery");
//   }
//   renderImages(srcArr) {
//     let newGalleryHtml = "";

//     for (const src of srcArr) {
//       newGalleryHtml += `<li><img src="${src}"></li>`;
//     }

//     this.gallery.innerHtml = newGalleryHtml;
//   }
// }

// const galleryRender = new GalleryRenderer();

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

    window.location.replace(
      `/url-parse?url=${encodeURIComponent(this.getInputData())}`
    );

    // fetch(this.url, {
    //   method: "POST",
    //   body: JSON.stringify({ url: this.getInputData() }),
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    // })
    // .then(res => {
    // return res.json();
    // })
    // .then(data => {
    // res.render("home.nj", { data: data });
    // })
    // .catch(err => console.error(err));
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
