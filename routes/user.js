"use strict"

const express = require('express');
const router = express.Router();
const main = require("../src/controllers/user");

/* GET users listing. */
router.get('/', main.set_user);

router.post('/', main.set_user);
router.post('/sign-in', main.sign_in);

module.exports = router;
