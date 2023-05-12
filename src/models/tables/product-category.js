"use strict"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const URLSchema = new Schema({
  id       : { type: Number },
  name     : { type: String },
  code     : { type: String },
  color    : { type: String },
  image    : { type: String },
  priority : { type: Number },
  product  : { type: Number },
}, { timestamps: true });

URLSchema.pre('save', function (next) {
  // handler here...

  next();
});

URLSchema.pre('findOneAndUpdate', function (next) {
  // handler here...

  next();
});

const models = mongoose.model('product_category', URLSchema);

module.exports = models;
