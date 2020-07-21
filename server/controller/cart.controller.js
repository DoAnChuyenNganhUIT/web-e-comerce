let Cart = require('../models/Cart');
const Product = require('../models/Product');
var session = require('express-session')

module.exports = {
    getCart: async (req, res, next) => {
        console.log('test')
        const {id = ''} = req.params;
        let cart = new Cart(req.session.cart ? req.session.cart : {});
        Product.findById(id, (err, product) => {
            if(err){
                res.json({
                    success: false
                })
            } else {
                cart.add(product, id);
                req.session.cart = cart;
                res.json({
                    success: true,
                    data: cart
                })
            }
        })
        
    }
}