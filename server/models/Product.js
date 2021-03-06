var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    kind: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    Create_date: {
      type: Date,
      default: Date.now,
    },
    image_name: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    status: {
      type: [
        {
          type: String,
          enum: ['available', 'umavailable'],
        },
      ],
      default: ['available'],
    },
    
      description: {
        type: String
      },
    
    categoryId: Schema.ObjectId,
  },
  { collection: 'product' }
);

productSchema.path('name').set(function (input) {
  return input[0].toUpperCase() + input.slice(1);
});

module.exports = mongoose.model('Product', productSchema);
