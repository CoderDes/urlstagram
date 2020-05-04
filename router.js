const { createReadStream } = require("fs");
const { join } = require("path");

const { Router } = require("express");
const Joi = require("@hapi/joi");

const Parser = require("./util/Parser.js");

const router = Router();
const parser = new Parser();

parser.setMinImgWidth = 100;
parser.setMinImgHeight = 100;

router.get("/", (req, res) => {
  res.render("home.nj", { title: "Urlstagram" });
});

router.get(/.(js|css)$/, (req, res) => {
  const { path } = req;
  const rs = createReadStream(join(__dirname, path));
  rs.pipe(res);
});

router.get("/url-parse", (req, res) => {
  const { query } = req;

  const { error } = Joi.object({
    url: Joi.string().required().uri(),
  }).validate(query);

  if (error) {
    res.status(400).send(error.details[0].message);
  }

  parser
    .parse(query.url)
    .then(elemHandles => {
      return parser.getArrayOfSources(elemHandles);
    })
    .then(imgSources => {
      res.status(200).json({ imgSources });
    })
    .catch(err => {
      throw new Error(err);
    });
});

module.exports = router;
