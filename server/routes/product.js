var router = global.router;
let product = require("../models/Product");
var mongoose = require("mongoose");
let fs = require("fs");
const {isAuth} = require('../controller/authentication.controller');
/* GET users listing. */

var controller = require("../controller/product.controller");

router.post("/insert_product", controller.insertProduct);

router.get("/list_product", controller.listProduct);

// xuat san pham theo id
router.get("/get_product_id/:id", controller.getProductId);



// xuat san pham theo tu khoa tim kiem
router.get("/find_key", controller.findKey);

router.put("/update_product/:id", controller.updateProduct);

router.delete("/delete_product/:id", controller.deleteProduct);

router.post("/upload_images", controller.uploadImages);

router.get("/open_image/:image_name", controller.openImage);
module.exports = router;
