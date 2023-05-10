"use strict"

const express = require('express');
const router = express.Router();
const main = require("../src/controllers/product-category");

/* GET users listing. */
router.get('/', main.set_product_category);

module.exports = router;
