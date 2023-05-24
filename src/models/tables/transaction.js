"use strict"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const URLSchema = new Schema({
  identifier  : { type: Number },
  transaction : { type: Object },
  fetch       : { type: Boolean },
  expiredAt   : { type: Date },
  grand_total : { type: Number },
  payments    : { type: Array },
  order_number: { type: String },
  invoice_id  : { type: String },
  access      : { type: String },
  status      : { type: String },
}, { timestamps: true });

URLSchema.pre('save', function (next) {
  // handler here...

  next();
});

URLSchema.pre('findOneAndUpdate', function (next) {
  // handler here...

  next();
});

const models = mongoose.model('transaction', URLSchema);

module.exports = models;
