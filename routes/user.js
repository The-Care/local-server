"use strict"

const express = require('express');
const router = express.Router();
const main = require("../src/controllers/user");

/* GET users listing. */
router.get('/', main.set_user);
router.get('/employee', main.get_list_employee);

router.post('/', main.set_user);
router.post('/access', main.get_employee_access);
router.post('/employee', main.set_list_employee);
router.post('/sign-in', main.sign_in);
router.post('/check-config', main.check_config);

module.exports = router;
