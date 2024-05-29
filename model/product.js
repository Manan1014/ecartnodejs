const mongoose = require('mongoose');

const productschema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    richdescription: {
        type: String,
        required: '',
    },
    image: {
        type: String,
        required: '',
    },
    images: [{
        type: String,
    }],
    brand: {
        type: String,
        required: '',
    },
    price: {
        type: Number,
        default: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    countinStock: {
        type: Number,
        required: true,
        max: 255,
        min: 0
    },
    rating: {
        type: String,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    datecreated: {
        type: Date,
        default: Date.now,
    }
})

const products = mongoose.model('Product', productschema)

module.exports = products;