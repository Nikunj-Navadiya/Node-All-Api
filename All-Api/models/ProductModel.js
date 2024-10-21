const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        default: 1,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 1
    },
    image: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true,
    }

})

const product = mongoose.model('product', productSchema);
module.exports = product;