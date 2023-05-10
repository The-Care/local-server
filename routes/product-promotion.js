"use strict"

const express = require('express');
const router = express.Router();
const main = require("../src/controllers/product-promotion");

/* GET users listing. */
router.get('/', main.set_product_promotion);

module.exports = router;
