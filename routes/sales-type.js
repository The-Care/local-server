"use strict"

const express = require('express');
const router = express.Router();
const main = require("../src/controllers/sales-type");

/* GET set_outlet listing. */
router.get('/', main.get_sales_type);

router.post('/', main.set_sales_type);

module.exports = router;
