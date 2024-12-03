"use strict"

const express = require('express');
const router = express.Router();
const main = require("../src/controllers/table");

/* GET set_outlet listing. */
router.get('/', main.get_table);

router.post('/', main.set_table);

module.exports = router;
