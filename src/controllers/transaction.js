"use strict"

const model = require('../models/mongo');
const axios = require("axios");

async function get_transaction_history(request, response) {
  try {
    const finded = await model.transaction
      .find({ identifier: request.query.identifier })
      .sort({ createdAt: -1 });

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
      { $set: { status: "paid" } }
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
        status      : "paid",
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

async function create_incremented_invoice_id(request, response) {
  try {
    const total = await model.transaction.count({
      "transaction.invoice_id": { $regex: '^P-', $options: 'i' }
    });
    const formatted_number = String(total + 1).padStart(6, '0');
    const invoice_id = `P-${request.body.outlet_id.invoice_code}${request.body.sales_type.invoice_code}-${formatted_number}`;

    return response.send(invoice_id);
  } catch (error) {
    console.log("error", error);

    return response.status(400).send(error);
  }
}

async function generate_order_number(request, response) {
  try {
    console.log("request.query.outlet_id", request.query.outlet_id);
    
    let outlet = await model.outlet.findOne({ id: +request.query.outlet_id });

    console.log("outlet", outlet);
    outlet = outlet.toObject();

    let store = await model.store.findOne({ id: outlet.store_id });

    console.log("store", store);
    store = store.toObject();

    const digit = store.type == 1 ? 3 : 6;

    const startDate = new Date('2025-02-25');
    const total = await model.transaction.count({
      createdAt: { $gte: startDate }
    });

    if (store.type == 1) {
      const orderNumber = (total % 999) + 1;
      const formattedOrderNumber = String(orderNumber).padStart(digit, '0');

      const generate_order_number = `${outlet.invoice_code}-${formattedOrderNumber}`;

      return response.send(generate_order_number);
    } else {
      const orderNumber = (total % 999999) + 1;
      const formattedOrderNumber = String(orderNumber).padStart(digit, '0');

      const generate_order_number = `${outlet.invoice_code}-${formattedOrderNumber}`;

      return response.send(generate_order_number);
    }
  } catch (error) {
    console.log("error", error);

    return response.status(400).send(error);
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
  create_incremented_invoice_id,
  generate_order_number,
};
