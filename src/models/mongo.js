"use strict"

module.exports = {
  user              : require("./tables/user"),
  store             : require("./tables/store"),
  outlet            : require("./tables/outlet"),
  banner            : require("./tables/banner"),
  employee          : require("./tables/employee"),
  payment           : require("./tables/outlet-payment"),
  sales_type        : require("./tables/outlet-sales-type"),
  config            : require("./tables/outlet-config"),
  product           : require("./tables/product"),
  product_category  : require("./tables/product-category"),
  product_promotion : require("./tables/product-promotion"),
  transaction       : require("./tables/transaction"),
  table             : require("./tables/table"),
};
