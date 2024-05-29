const express = require('express');
const morgan = require('morgan');
const expressjwt = require('express-jwt');
const app = express();
const categoryroute = require('./route/categories');
const productroute = require('./route/products')
const userroute = require('./route/users')
const authjwt = require('./helpers/jwt');
const db = require('./config/db');
// require('dotenv/config')
// console.log(process.env.connection_string);
const cors = require('cors');
app.options('*', cors);
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(morgan('tiny'));
app.use(categoryroute);
app.use(productroute);
app.use(userroute);
app.use(authjwt());

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})