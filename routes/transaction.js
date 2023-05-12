"use strict"

const express = require('express');
const router = express.Router();
const main = require("../src/controllers/transaction");

/* GET users listing. */
router.get('/'            , main.get_transaction_history);
router.get('/order-number', main.get_order_number);

router.post('/', main.create_transaction);

module.exports = router;
