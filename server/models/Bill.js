const mongoose = require('mongoose');

let billSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            index: true
        },
        totalItems: {
            type: Number
        },
        totalPrice: {
            type: Number
        },
        // payment: [
        //     {
        //         productId: {
        //             type: mongoose.Schema.Types.ObjectId,
        //             ref: 'product',
        //             index: true
        //         },
        //         quantity: {
        //             type: Number
        //         },
        //         price: {
        //             type: Number
        //         }

        //     }
        // ]
        payment: {
            type: Array
        }
    }
);

let Bill = (module.exports = mongoose.model('Bill' , billSchema))
