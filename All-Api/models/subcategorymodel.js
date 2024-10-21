const mongoose = require('mongoose');

const ApiSchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    subcategory: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        default: 1
    },
})

const subCategory = mongoose.model('subCategory', ApiSchema);
module.exports = subCategory