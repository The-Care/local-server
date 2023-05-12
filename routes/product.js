"use strict"

const express = require('express');
const router = express.Router();
const main = require("../src/controllers/product");

/* GET users listing. */
router.get('/', main.get_list_product);
router.get('/category', main.get_list_product_category);
router.get('/promotion', main.get_list_product_promotion);

router.post('/promotion', main.set_list_product_promotion);
router.post('/category', main.set_list_product_category);
router.post('/', main.set_list_product);

module.exports = router;
