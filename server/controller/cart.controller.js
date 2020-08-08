let Cart = require('../models/Cart');
const Product = require('../models/Product');
const Bill = require('../models/Bill');

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
                req.session.save();
                // const bill = new Bill({
                //     userId: req.body.userId,
                //     totalItems : cart.length;
                //     totalPrice: 
                // })
                res.json({
                    success: true,
                    session: req.session.cart,
                    data: cart
                })
            }
        }) 
    },

    subCart: async (req, res, next) => {
        console.log('test')
        const {id = ''} = req.params;
        let cart = new Cart(req.session.cart ? req.session.cart : {});
        Product.findById(id, (err, product) => {
            if(err){
                res.json({
                    success: false
                })
            } else {
                cart.sub(product, id);
                req.session.cart = cart;
                req.session.save();
                // const bill = new Bill({
                //     userId: req.body.userId,
                //     totalItems : cart.length;
                //     totalPrice: 
                // })
                res.json({
                    success: true,
                    session: req.session.cart,
                    data: cart
                })
            }
        }) 
    },

    removeCart: async (req, res, next) => {
        const {id = ''} = req.params;
        let cart = new Cart(req.session.cart ? req.session.cart : {});
        cart.remove(id);
        req.session.cart = cart;
        req.session.save();
        res.json({
            success: true,
            data: cart
        })
    },
    shoppingCart: async (req, res, next) => {
        if (!req.session.cart){
            res.json({
                success: false,
                message: 'cart is null'
            });
        }
        let cart = new Cart(req.session.cart);
        res.json({
            success: true,
            data: {
                totalItems: cart.totalItems,
                totalPrice: cart.totalPrice,
                payment: cart.getItems().arr
            }
        })
    },
    payment: async (req, res, next) => {
        const {id= ''} = req.params;
        if(!req.session.cart){
            res.json({
                success: false,
                data: [],
                message: 'cart is null'
            })
        }
        let cart = new Cart(req.session.cart);
        const newBill = new Bill({
            userId: id,
            totalItems: cart.totalItems,
            totalPrice: cart.totalPrice,
            payment: cart.getItems().arr
        })
        newBill.save((err, bill) => {
            if(err){
                res.json({
                    success: false,
                    data: {},
                    message: `err is ${err}`
                });
            } else {
                res.json({
                    success: true,
                    data: bill,
                    message:'add bill success'
                })
            }
        })
    }
}