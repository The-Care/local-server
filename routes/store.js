"use strict"

const express = require('express');
const router = express.Router();
const main = require("../src/controllers/store");

/* GET store listing. */
router.get('/', main.get_store);

router.post('/', main.set_store);

module.exports = router;
