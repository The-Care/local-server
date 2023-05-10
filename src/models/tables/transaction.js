const mongoose = require('mongoose')
const Schema = mongoose.Schema

const URLSchema = new Schema({
  identifier  : { type: Number },
  transaction : { type: Object },
  fetch       : { type: Boolean },
  expiredAt   : { type: Date },
  grand_total : { type: Number },
  payments    : { type: Array },
}, { timestamps: true });

URLSchema.pre('save', function (next) {
  // const _d = new Date(URLSchema.tree.updatedAt());
  // const _h = _d.getHours();

  // _d.setHours(_h + 14);

  // this.expiredAt = _d;

  next();
});

URLSchema.pre('findOneAndUpdate', function (next) {
  // const _d = new Date(this.getUpdate().$set.updatedAt);
  // const _h = _d.getHours();

  // _d.setHours(_h + 14);

  // this.getUpdate().$set.expiredAt = _d;

  next();
});

const models = mongoose.model('transaction', URLSchema);

module.exports = models;
