"use strict"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const URLSchema = new Schema({
  outlet_id: { type: Number },
  anyobject: Schema.Types.Mixed,
}, { timestamps: true, strict: false });

URLSchema.pre('save', function (next) {
  // handler here...

  next();
});

URLSchema.pre('findOneAndUpdate', function (next) {
  // handler here...

  next();
});

const models = mongoose.model('outlet_config', URLSchema);

module.exports = models;
