"use strict"

const model = require('../models/mongo');

async function set_store(request, response) {
  try {
    console.log("set_store");
    console.log(JSON.stringify(request.body, 0, 2));
    console.log("set_store");

    await model.store
      .update({ id: request.body.id }, { ...request.body }, { upsert: true });

    return response.json({
      status  : true,
      message : "set_store",
      result  : null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_store", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

module.exports = { set_store };
