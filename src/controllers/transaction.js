"use strict"

const model = require('../models/mongo');
const axios = require("axios");

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

async function match_voided_transaction(request, response) {
  try {
    console.log('====================================');
    console.log(JSON.stringify(request.body, 0, 2));
    console.log('====================================');
    const invoide_ids = request.body.map(({ invoice_id }) => invoice_id);
  
    await model.transaction.updateMany(
      {
        "transaction.invoice_id": {
          $in: invoide_ids,
        }
      },
      { $set: { status: "void" } }
    );
    await model.transaction.updateMany(
      {
        "transaction.invoice_id": {
          $nin: invoide_ids,
        }
      },
      { $set: { status: "received" } }
    );

    return response.send("OK");
  } catch (error) {
    console.log('====================================');
    console.log("error at match_voided_transaction", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

async function create_transaction(request, response) {
  try {
    const transaction = { ...request.body, created_at: new Date() };
    await model.transaction
      .create({
        transaction,
        identifier  : request.body.identifier,
        fetch       : request.body.fetch,
        grand_total : request.body.grand_total,
        invoice_id  : request.body.invoice_id,
        payments    : request.body.payments,
        order_number: request.body.order_number,
        access      : request.headers.token,
        status      : "received",
      });

    return response.json({
      status  : true,
      message : "create_transaction",
      result  : null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at create_transaction", JSON.stringify(request.body, 0, 2));
    console.log("error at create_transaction", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

async function get_offline_data(request, response) {
  try {
    const offline_data = await model.transaction
      .find({ $or: [{ "transaction.connection": "offline" }, { "transaction.fetch": false }] });

    console.log('====================================');
    console.log("get_offline_data");
    console.log('====================================');

    return response.json({
      status  : true,
      message : "get_offline_data",
      result  : offline_data,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at get_offline_data", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

async function update_transaction(request, response) {
  try {
    console.log('====================================');
    console.log("update_transaction", request.body);
    console.log('====================================');
    await model.transaction.updateMany(
      { $or: [
        { _id : { $in: request.body.ids } },
        { "transaction.invoice_id" : { $in: request.body.invoices } }
      ]},
      { $set: { "transaction.connection": "online", "transaction.fetch": true, "fetch": true } },
    );

    return response.send("update_transaction:OK!");
  } catch (error) {
    console.log('====================================');
    console.log("error at update_transaction", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

async function count_transaction(request, response) {
  try {
    let start_date = new Date(request.body.date);
    let end_date   = new Date(request.body.date);
    
    start_date.setDate(start_date.getDate() - 1);
    end_date.setDate(end_date.getDate() + 1);

    console.log("count_transaction:start_date => ", start_date.toISOString().split("T")[0]);
    console.log("count_transaction:end_date   => ", end_date.toISOString().split("T")[0]);

    const total = await model.transaction
      .count({
        createdAt: {
          $gte: start_date.toISOString().split("T")[0],
          $lte: end_date.toISOString().split("T")[0],
        }
      });

    return response.json({
      status  : true,
      message : "Success",
      response: total,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at update_transaction", error);
    console.log('====================================');

    return response.json({
      status  : true,
      message : error,
      response: error,
    });
  }
}

module.exports = {
  create_transaction,
  get_order_number,
  get_transaction_history,
  get_offline_data,
  update_transaction,
  match_voided_transaction,
  count_transaction,
};
