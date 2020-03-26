var router = global.router;
let product = require('../models/Product');
var mongoose = require("mongoose")
let fs = require('fs');

/* GET users listing. */

var controller = require('../controller/product.controller');

router.post('/insert_product', controller.insertProduct);

router.get('/list_product', controller.listProduct);

// xuat san pham theo id
router.get('/get_product_id', controller.getProductId);


  // xuat san pham theo tu khoa tim kiem
  router.get('/find_key', controller.findKey);


router.put('/update_product',controller.updateProduct)
 
router.delete('/delete_product', controller.deleteProduct);

router.post('/upload_images', controller.uploadImages);

router.get('/open_image', controller.openImage);
module.exports = router;
