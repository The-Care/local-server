"use strict"

const model = require('../models/mongo');

async function get_store(request, response) {
  try {
    const store = await model.store.findOne({ id: +request.query.id });

    console.log('====================================');
    console.log(store);
    console.log('====================================');

    return response.json({
      status : store !== null,
      message: "set_store",
      result : store !== null ? store : null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_store", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

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

module.exports = { get_store, set_store };
