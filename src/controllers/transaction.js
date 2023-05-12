"use strict"

const model = require('../models/mongo');

async function get_transaction_history(request, response) {
  try {
    const finded = await model.transaction
      .find({ identifier: request.query.identifier });

    return response.json({
      status  : true,
      message : "get_order_number",
      result  : finded,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at get_order_number", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

async function get_order_number(request, response) {
  try {
    const finded = await model.transaction
      .find({ identifier: request.query.identifier })
      .count();

    return response.json({
      status  : true,
      message : "get_order_number",
      result  : finded + 1,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at get_order_number", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

async function create_transaction(request, response) {
  try {
    const transaction = { ...request.body, created_at: new Date() };
    const created_transaction = await model.transaction
      .create({
        transaction,
        identifier  : request.body.identifier,
        fetch       : request.body.fetch,
        grand_total : request.body.grand_total,
        payments    : request.body.payments,
        order_number: request.body.order_number,
        access      : request.headers.token
      });

    console.log("created_transaction", created_transaction);

    return response.json({
      status  : true,
      message : "create_transaction",
      result  : null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at create_transaction", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

module.exports = {
  create_transaction,
  get_order_number,
  get_transaction_history,
};
