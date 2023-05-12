"use strict"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const URLSchema = new Schema({
  outlet_id : { type: Number },
  lists  : { type: Array },
}, { timestamps: true });

URLSchema.pre('save', function (next) {
  // handler here...

  next();
});

URLSchema.pre('findOneAndUpdate', function (next) {
  // handler here...

  next();
});

const models = mongoose.model('outlet_payment', URLSchema);

module.exports = models;
