const { createReadStream } = require("fs");
const { join } = require("path");

const { Router } = require("express");
const Joi = require("@hapi/joi");

const router = Router();

router.get("/", (req, res) => {
  res.render("home.nj", { title: "Urlstagram" });
});

router.get(/.(js|css)$/, (req, res) => {
  const { path } = req;
  const rs = createReadStream(join(__dirname, path));
  rs.pipe(res);
});

router.post("/url-parse", (req, res) => {
  const { body } = req;

  const { error } = Joi.object({
    url: Joi.string().required().uri(),
  }).validate(body);

  if (error) {
    res.status(400).send(error.details[0].message);
  }
});

module.exports = router;
