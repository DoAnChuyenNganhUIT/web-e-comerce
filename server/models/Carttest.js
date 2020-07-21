const mongoose = require('mongoose');

let cartSchema = mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
            require: true,
            index: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
            index:  true
        }
    },
    {
        timestamps: true
    }
)

cartSchema.statics = {
    async getCartOF(userId, page, limit){
        try {
            let cart = await this.aggregate([
                {
                    $match: {
                        userId: mongoose.Types.ObjectId(userId)
                    }
                },
                {
                    $lookup: {
                        form: 'products',
                        localField: 'productId',
                        foreignField: '_id',
                        as:'product'
                    }
                },
                {
                    $unwind: '$product'
                },
                {
                    $addField: {
                        'product.isUpcoming': {
                            $and: [
                                {  $gte: ['&product.time', new Date()] },
                                {
                                    $lt: [
                                        '$event.time',
                                        {
                                            $add: [new Date(), 5 * 24 * 60 * 60000]
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                },
                {
                    $match: {
                        'product.active': true
                    }
                },
                {
                    $skip: Number(page * limit)
                },
                {
                    $limit: Number(limit)
                }
            ]);
            return cart;

        } catch (error) {
            throw error;
        }
    },
    async getToTal(userId) {
        try {
            let total = await this.aggregate([
                {
                    $match: {
                        userId: mongoose.Types.ObjectId(userId)
                    }
                },
                {
                    $lookup: {
                        from: 'products',
                        localField:'productId',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                {
                    $unwind: '$product'
                },
                {
                    $match: {
                        'product.active': true
                    }
                },
                {
                    $group: { _id: null, count: {$sum: 1}}
                }
            ]);
            return total.length ? total[0].count : 0;
        } catch (error) {
            throw error;
        }
    }
};

module.exports.cartSchema = mongoose.model('cart', cartSchema);