"use strict"

const express = require('express');
const router = express.Router();
const main = require("../src/controllers/product");

/* GET users listing. */
router.get('/', main.set_list_product);

module.exports = router;
