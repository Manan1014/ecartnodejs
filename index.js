const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const homeroute = require('./route/home')

require('dotenv/config');
const app = express();
app.use(express.json());
app.use(bodyparser.json());
app.use(homeroute);
app.use(morgan('tiny'));
let x = mongoose.connect(process.env.connection_string);
// Connect to MongoDB database
x.then(() => {
    console.log("connection ready successfully");
})
x.catch((err) => {
    console.log(err);
})

const productschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: Number,
    image: String
})
const Product = mongoose.model('Product', productschema);




const api = process.env.api_url;
app.get(`${api}/products`, async(req, res) => {
    const products = await Product.find();
    if (!products) {
        res.status(500).json({ success: false });
    }
    res.send(products);
})

app.post(`${api}/products`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image
    })
    product.save().then((createproduct => {
            res.status(201).json(createproduct);
        }))
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false
            })
        })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

// const express = require('express');
// const app = express();
// const homeroute = require('./route/home');
// const db = require('./config/db')

// app.set('view engine', 'ejs');
// app.use(express.static('public'))
// // app.use(db);
// app.use(homeroute);
// app.listen(3000, () => {
//     console.log("Server is running on port 3000");
// })