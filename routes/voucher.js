"use strict"

const express = require('express');
const router = express.Router();
const main = require("../src/controllers/voucher");

/* GET users listing. */
router.get('/', main.set_list_voucher);

module.exports = router;
