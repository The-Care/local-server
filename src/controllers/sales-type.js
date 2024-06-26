"use strict"

const model = require('../models/mongo');

async function get_sales_type(request, response) {
  try {
    const sales_type = await model.sales_type
      .findOne({ outlet_id: request.query.outlet_id });

    return response.json({
      status : sales_type !== null,
      message: "set_sales_type",
      result : sales_type !== null ? sales_type.lists : null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_sales_type", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

async function set_sales_type(request, response) {
  try {
    await model.sales_type
      .updateMany({ outlet_id: request.body.outlet_id }, { lists: request.body.lists }, { upsert: true });

    return response.json({
      status : true,
      message: "set_sales_type",
      result : null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_sales_type", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

module.exports = { get_sales_type, set_sales_type };
