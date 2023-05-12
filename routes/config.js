"use strict"

const express = require('express');
const router = express.Router();
const main = require("../src/controllers/config");

/* GET set_config listing. */
router.get('/', main.set_config);

router.post('/', main.set_config);

module.exports = router;
