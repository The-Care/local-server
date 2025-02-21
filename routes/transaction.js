"use strict"

const express = require('express');
const router = express.Router();
const main = require("../src/controllers/transaction");

/* GET users listing. */
router.get('/'             , main.get_transaction_history);
router.get('/offline'      , main.get_offline_data);
router.get('/order-number' , main.get_order_number);
router.get('/generate-order-number' , main.generate_order_number);

router.post("/invoice-id"  , main.create_incremented_invoice_id);
router.post('/count'       , main.count_transaction);
router.post('/'            , main.create_transaction);
router.post('/match-voided', main.match_voided_transaction);

router.patch('/'           , main.update_transaction);

module.exports = router;
