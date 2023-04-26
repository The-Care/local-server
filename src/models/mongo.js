const mongoose = require('mongoose')
const Schema = mongoose.Schema

const URLSchema = new Schema({
  full       : { type:String },
  shorted    : { type:String },
  expiredAt  : { type:Date },
  bot_id     : { type:Number },
  user_click : []
},{ timestamps: true })

URLSchema.pre('save', function(next){
  const _d = new Date(URLSchema.tree.updatedAt())
  const _h = _d.getHours()

  _d.setHours(_h + 1)
  this.expiredAt = _d

  next()
})

URLSchema.pre('findOneAndUpdate', function(next){
  const _d = new Date(this.getUpdate().$set.updatedAt)
  const _h = _d.getHours()

  _d.setHours(_h + 1)
  this.getUpdate().$set.expiredAt = _d

  next()
})

const models = mongoose.model('URL', URLSchema)

module.exports = models
