"use strict"

const express = require('express');
const router = express.Router();
const main = require("../src/controllers/store");

/* GET store listing. */
router.get('/', main.get_store);
router.get('/banner', main.get_banner);

router.post('/', main.set_store);
router.post('/banner', main.set_banner);
router.post("/generate-report", main.generate_report);

module.exports = router;
