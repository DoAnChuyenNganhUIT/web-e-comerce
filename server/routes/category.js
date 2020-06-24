var router = global.router;
let category = require("../models/Category");
let product = require("../models/Product");
var mongoose = require("mongoose");

var controller = require("../controller/category.controller");

router.post("/insert_category", controller.insertCategory);

router.delete("/delete_category", controller.deleteCategory);

module.exports = router;
