"use strict"

const express = require('express');
const router = express.Router();
const main = require("../src/controllers/setup");

/* GET users listing. */
router.get('/', main.set_sales_type);

module.exports = router;
