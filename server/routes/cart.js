let router = global.router;
const controller = require('../controller/cart.controller');

router.get('/add-cart/:id', controller.getCart);

module.exports = router;