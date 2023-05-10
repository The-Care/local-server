"use strict"

const express = require('express');
const router = express.Router();
const main = require("../src/controllers/transaction");

/* GET users listing. */
router.get('/'            , main.get_transaction_history);
router.get('/order-number', main.get_order_number);
router.get('/today-sales' , main.today_sales);
router.get('/cash-income' , main.cash_income);
router.get('/non-cash-income' , main.non_cash_income);
router.get('/daily-payments' , main.daily_payments);
router.get('/count-transaction' , main.count_transaction);

router.post('/', main.create_transaction);

module.exports = router;
