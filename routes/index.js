var express = require('express');
var router = express.Router();
// const { create, get_many } = require("../src/controllers/index");
const config = require("./config");
const outlet = require("./outlet");
const payment = require("./payment");
const product_category = require("./product-category");
const product_promotion = require("./product-promotion");
const product = require("./product");
const sales_type = require("./sales-type");
const shift = require("./shift");
const store = require("./store");
const transaction = require("./transaction");
const user = require("./user");
const voucher = require("./voucher");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use("/config"            , config);
router.use("/outlet"            , outlet);
router.use("/payment"           , payment);
router.use("/product-category"  , product_category);
router.use("/product-promotion" , product_promotion);
router.use("/product"           , product);
router.use("/sales-type"        , sales_type);
router.use("/shift"             , shift);
router.use("/store"             , store);
router.use("/transaction"       , transaction);
router.use("/user"              , user);
router.use("/voucher"           , voucher);

// router.post("/create", create);
// router.post("/get_many", get_many);

module.exports = router;
