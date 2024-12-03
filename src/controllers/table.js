"use strict"

const model = require('../models/mongo');

async function get_table(request, response) {
  try {
    const sales_type = await model.table
      .findOne({ outlet_id: request.query.outlet_id });

    return response.json({
      status : table !== null,
      message: "set_table",
      result : table !== null ? table.lists : null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_table", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

async function set_table(request, response) {
  try {
    await model.table
      .updateMany({ outlet_id: request.body.outlet_id }, { lists: request.body.lists }, { upsert: true });

    return response.json({
      status : true,
      message: "set_table",
      result : null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_table", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

module.exports = { get_table, set_table };
