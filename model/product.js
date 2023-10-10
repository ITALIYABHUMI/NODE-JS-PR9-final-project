const mongoose = require('mongoose');

const productschema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory'
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },  
    qty: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const product = mongoose.model('product', productschema);
module.exports = product;