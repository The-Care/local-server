"use strict"

const model = require('../models/mongo');

async function set_outlet(request, response) {
  try {
    console.log("set_outlet");
    console.log(JSON.stringify(request.body, 0, 2));
    console.log("set_outlet");

    await model.outlet
      .update({ outlet_id: request.body.id }, { detail: request.body }, { upsert: true });

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

module.exports = { set_outlet };
