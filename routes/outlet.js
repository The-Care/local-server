"use strict"

const express = require('express');
const router = express.Router();
const main = require("../src/controllers/outlet");

/* GET set_outlet listing. */
router.get('/', main.set_outlet);

router.post('/', main.set_outlet);

module.exports = router;
