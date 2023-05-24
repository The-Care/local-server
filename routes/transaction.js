"use strict"

const express = require('express');
const router = express.Router();
const main = require("../src/controllers/transaction");

/* GET users listing. */
router.get('/'             , main.get_transaction_history);
router.get('/offline'      , main.get_offline_data);
router.get('/order-number' , main.get_order_number);

router.post('/'            , main.create_transaction);
router.post('/match-voided', main.match_voided_transaction);

router.patch('/'           , main.update_transaction);

module.exports = router;
