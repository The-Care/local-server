"use strict"

const model = require('../models/mongo');

async function set_config(request, response) {
  try {
    console.log("set_config");
    console.log(JSON.stringify(request.body, 0, 2));
    console.log("set_config");

    await model.config
      .update({ outlet_id: request.body.outlet_id }, { ...request.body }, { upsert: true });

    return response.json({
      status: true,
      message: "set_config",
      result: null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_config", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

module.exports = { set_config };
