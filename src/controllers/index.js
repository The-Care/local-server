const model = require('../models/mongo')
const crypto = require('crypto')
const config = require("../../config.json");

async function get_many(request, response) {
  try {
    console.log('@controller.get_many.start', model)
    const codes = request.body.codes.map(el => `${config.base}/${el}`)
    const lists = await model.find().where('shorted').in(codes)

    return response.json(lists)
  } catch (error) {
    console.log('@error.get_many | ', error)

    return response.send(error)
  }
}

async function create(request, response) {
  try {
    console.log('@create.start')
    const { base } = request.body
    const list     = await model.find({ full: base }).exec()
    let key        = crypto.scryptSync(base, 'balesin-url', 4).toString('hex')
    const is_exist = await model.find({ shorted: `${config.base}/${key}` }).exec()

    if (is_exist.length) {
      if (is_exist[0].full !== base) {
        key += `b-${is_exist.length}`
      }
    }

    if (list.length) {
      const updated = await model.findByIdAndUpdate(
        { _id : list[0]._id },
        { $set: {
          shorted  : `${config.base}/${key}`,
          expiredAt: ''
        } },
        { new: true }
      ).exec()

      return response.json(updated)
    }

    const created = await model.create({
      full   : base,
      shorted: `${config.base}/${key}`,
    })

    return response.json(created)
  } catch (error) {
    console.log('@create.error |', error)

    return response.send(error)
  }
}

module.exports = {
  create,
  get_many,
}
