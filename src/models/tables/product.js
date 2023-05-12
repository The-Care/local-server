"use strict"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const URLSchema = new Schema({
  id           : { type: Number },
  brand        : { type: String },
  category     : { type: String },
  category_id  : { type: String },
  image        : { type: String },
  main_price   : { type: String },
  name         : { type: String },
  sales_type   : { type: Array },
  sub_category : { type: Array },
  variants     : { type: Array },
}, { timestamps: true });

URLSchema.pre('save', function (next) {
  // handler here...

  next();
});

URLSchema.pre('findOneAndUpdate', function (next) {
  // handler here...

  next();
});

const models = mongoose.model('product', URLSchema);

module.exports = models;
