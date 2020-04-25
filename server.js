const express = require("express");
const nunjucks = require("nunjucks");

const router = require("./router.js");

const app = express();
const port = process.env.PORT || 3000;

nunjucks.configure("view", { autoescape: true, express: app });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => console.log(`SERVER STARTED ON PORT ${port}`));
