const mongoose = require('mongoose');
const { schema } = require('./Product');
let Schema = mongoose.Schema;

const imageSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        createDate: {
            type: Date,
            default: Date.now,
        },
        url:{
            type: String
        },
        userId: Schema.ObjectId,
    },
    {
        collection: 'MyImage'
    }
)

module.exports = mongoose.model('MyImage',imageSchema);