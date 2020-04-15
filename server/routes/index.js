global.router = require("express").Router();
var router = global.router;

router = require("./product");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "DO AN CHUYEN NGANH" });
});

module.exports = router;
