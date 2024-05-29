const mongoose = require('mongoose');
require('dotenv/config');
let x = mongoose.connect("mongodb+srv://Manan:Manan@cluster0.vv4lzi6.mongodb.net/eshop");
// Connect to MongoDB database
x.then(() => {
    console.log("connection ready successfully");
})
x.catch((err) => {
    console.log("some problem occur in connection creating");
    console.log(err);
})