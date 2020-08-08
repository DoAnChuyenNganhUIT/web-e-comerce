let router = global.router;
const controller = require('../controller/cart.controller');

router.get('/add-cart/:id', controller.getCart);
router.get('/sub-cart/:id', controller.subCart);
router.get('/remove-cart/:id', controller.removeCart);
router.get('/shopping-cart', controller.shoppingCart);
router.get('/payment/:id', controller.payment);

module.exports = router;