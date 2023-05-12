"use strict"

const express = require('express');
const router = express.Router();
const main = require("../src/controllers/payment");

/* GET payments listing. */
router.get('/', main.set_payment);

router.post('/', main.set_payment);

module.exports = router;
