"use strict"

const express = require('express');
const router = express.Router();
const main = require("../src/controllers/shift");

/* GET shift listing. */
router.get('/', main.set_shift);

module.exports = router;
