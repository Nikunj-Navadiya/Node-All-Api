const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 1
    }
})

const category = mongoose.model('category', categorySchema);
module.exports = category;