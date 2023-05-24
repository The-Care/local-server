"use strict"

const model = require('../models/mongo');

async function get_store(request, response) {
  try {
    const store = await model.store.findOne({ id: +request.query.id });

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

async function get_banner(request, response) {
  try {
    const banner = await model.banner.find();

    return response.json({
      status  : true,
      message : "get_banner",
      result  : banner.length ? banner[0] : null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at get_banner", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

async function set_banner(request, response) {
  try {
    await model.banner.deleteMany();
    await model.banner.create(request.body);

    return response.json({
      status  : true,
      message : "set_banner",
      result  : null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_banner", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

module.exports = {
  get_store,
  set_store,
  get_banner,
  set_banner,
};
