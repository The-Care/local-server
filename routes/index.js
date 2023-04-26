var express = require('express');
var router = express.Router();
const { create, get_many } = require("../src/controllers/index");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/create", create);
router.post("/get_many", get_many);

module.exports = router;
