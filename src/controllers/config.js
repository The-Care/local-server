"use strict"

const model = require('../models/mongo');

async function get_config(request, response) {
  try {
    const config = await model.config
      .findOne({ outlet_id: +request.query.outlet_id });

    console.log('====================================');
    console.log(config);
    console.log('====================================');

    return response.json({
      status : config !== null,
      message: "set_config",
      result : config !== null ? config : null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_config", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

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

module.exports = { get_config, set_config };
