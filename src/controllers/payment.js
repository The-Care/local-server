"use strict"

const model = require('../models/mongo');

async function get_payment(request, response) {
  try {
    const payment = await model.payment
      .findOne({ outlet_id: request.query.outlet_id });

    return response.json({
      status : payment !== null,
      message: "set_payment",
      result : payment !== null ? payment.lists : null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_payment", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

async function set_payment(request, response) {
  try {
    await model.payment
      .update({ outlet_id: request.body.outlet_id }, { lists: request.body.lists }, { upsert: true });

    return response.json({
      status: true,
      message: "set_payment",
      result: null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_payment", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

module.exports = { get_payment, set_payment };
