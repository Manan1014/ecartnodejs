const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwordhash: {
        type: String,
        required: true
    },
    street: {
        type: String,
        default: ''
    },
    apartment: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    zip: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    phone: {
        type: Number,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

userschema.virtual('id').get(function() {
    return this._id.toHexString();
})

userschema.set('toJSON', {
    virtuals: true
});

const user = mongoose.model('user', userschema)

module.exports = user;