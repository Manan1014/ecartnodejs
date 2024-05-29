const mongoose = require('mongoose');

const categoryschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: ''
    },
    icon: {
        type: String,
    },
})

const Category = mongoose.model('Category', categoryschema);

module.exports = Category;