"use strict"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const URLSchema = new Schema({
  id                      : { type: Number },
  name                    : { type: String },
  code                    : { type: String },
  image                   : { type: String },
  max_requirement_product : { type: Number },
  description             : { type: String },
  start_time              : { type: String },
  end_time                : { type: String },
  qty                     : { type: Number },
  unlimited_mode          : { type: Number },
  no_expiry               : { type: Number },
  requirement_type        : { type: Number },
  autoselect              : { type: Number },
  category_id             : { type: Number },
  sales_type              : { type: Array },
  requirements            : { type: Array },
  reward                  : { type: Array },
}, { timestamps: true });

URLSchema.pre('save', function (next) {
  // handler here...

  next();
});

URLSchema.pre('findOneAndUpdate', function (next) {
  // handler here...

  next();
});

const models = mongoose.model('product_promotion', URLSchema);

module.exports = models;
