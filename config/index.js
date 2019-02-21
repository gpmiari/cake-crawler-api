const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const products = require('../lib/products');

const router = express.Router();
products.routes(router);

app.set('json spaces', 2);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);


module.exports = app;