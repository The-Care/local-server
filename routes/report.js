"use strict"

const express = require('express');
const router = express.Router();
const main = require("../src/controllers/report");

/* GET users listing. */
router.get('/today-sales', main.today_sales);
router.get('/cash-income', main.cash_income);
router.get('/non-cash-income', main.non_cash_income);
router.get('/daily-payments', main.daily_payments);
router.get('/count-transaction', main.count_transaction);

module.exports = router;
