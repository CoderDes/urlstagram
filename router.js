const { createReadStream } = require("fs");
const { join } = require("path");
const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.render("home.nj", { title: "Urlstagram" });
});

router.get(/.(js|css)$/, (req, res) => {
  const { path } = req;
  const rs = createReadStream(join(__dirname, path));
  rs.pipe(res);
});

module.exports = router;
