"use strict"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const URLSchema = new Schema({
  id       : { type : Number },
  user_id  : { type : String },
  user_pin : { type : String },
  email    : { type : String },
  password : { type : String },
  name     : { type : String },
  store_id : { type : Number },
  outlet_id: { type : Number },
  access   : { type : String },
  machine  : { type : String },
}, { timestamps: true });

URLSchema.pre('save', function (next) {
  // handler here...

  next();
});

URLSchema.pre('findOneAndUpdate', function (next) {
  // handler here...

  next();
});

const models = mongoose.model('user', URLSchema);

module.exports = models;
