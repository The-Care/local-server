"use strict"

const model = require('../models/mongo');
const axios = require("axios");
const fs = require("fs");

async function generate_report(request, response) {
  try {
    console.log(request.body);

    await axios
      .get(request.body.url_file, { responseType: 'arraybuffer' })
      .then(response => {
        fs.writeFile(
          request.body.path,
          new Buffer(response.data, 'base64').toString('binary'),
          "binary",
          (err) => {
            console.log('====================================');
            console.log(err);
            console.log('====================================');
          });
      });

    return response.send("OK!");
  } catch (error) {
    console.log('====================================');
    console.log("error at set_store", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

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
      .updateMany({ id: request.body.id }, { ...request.body }, { upsert: true });

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
  generate_report,
};
