"use strict"

const model = require('../models/mongo');

async function get_outlet(request, response) {
  try {
    const outlet = await model.outlet.findOne({ id: +request.query.id });

    return response.json({
      status : outlet !== null,
      message: "set_outlet",
      result : outlet !== null ? outlet : null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_outlet", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

async function set_outlet(request, response) {
  try {
    await model.outlet
      .update({ id: request.body.id }, { ...request.body }, { upsert: true });

    return response.json({
      status: true,
      message: "set_outlet",
      result: null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_outlet", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

module.exports = { get_outlet, set_outlet };
