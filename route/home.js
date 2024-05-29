const express = require('express');
const bodyparser = require('body-parser');

const routes = express();
routes.use(bodyparser.json());


routes.get('/', (req, res) => {
    res.send("this is working...")
})

module.exports = routes;