"use strict"

const model = require('../models/mongo')
const config = require("../../config.json");

async function get_transaction_history(request, response) {
  try {
    const finded = await model.transaction.find({
      identifier: request.query.identifier,
    });

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

async function count_transaction(request, response) {
  try {
    const finded = await model.transaction.find({
      identifier: request.query.identifier,
    }).count();

    return response.json({
      status  : true,
      message : "count_transaction",
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
    const finded = await model.transaction.find({
      identifier: request.query.identifier,
    }).count();

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
    const created_transaction = await model.transaction.create({
      transaction,
      identifier : request.body.identifier,
      fetch      : request.body.fetch,
      grand_total: request.body.grand_total,
      payments   : request.body.payments,
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

async function today_sales(request, response) {
  try {
    const total = await model.transaction.aggregate(
      [
        { $match: { identifier: +request.query.identifier } },
        { $group: { _id: null, total: { $sum: "$grand_total" } } },
      ]
    );

    console.log('====================================');
    console.log(total);
    console.log('====================================');

    return response.json({
      status  : true,
      message : "today_sales",
      result  : total.length ? total[0].total : 0,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at today_sales", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

async function cash_income(request, response) {
  try {
    let total = 0;
    const _cash_income = await model.transaction.find({
      identifier: +request.query.identifier, "payments.type": "CASH"
    });

    _cash_income.forEach(item => {
      item.payments.forEach(payment => {
        if (payment.type.toLowerCase() === "cash") total += +payment.amount;
      });
    });

    return response.json({
      status  : true,
      message : "cash_income",
      result  : total,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at cash_income", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

async function non_cash_income(request, response) {
  try {
    let total = 0;
    const _non_cash_income = await model.transaction.find({
      identifier: +request.query.identifier, "payments.type": { "$in" : ["CARD/DEBIT", "OTHER"] }
    });

    _non_cash_income.forEach(item => {
      item.payments.forEach(payment => {
        if (
          payment.type.toLowerCase() === "card/debit"
          || payment.type.toLowerCase() === "other"
        ) {
          total += +payment.amount;
        }
      });
    });

    return response.json({
      status  : true,
      message : "non_cash_income",
      result  : total,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at non_cash_income", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

async function daily_payments(request, response) {
  try {
    const results = {};
    const _daily_payments = await model.transaction.aggregate([
      { $unwind: "$payments" },
      { $unwind: "$payments.name" },
      {
        $group:
        {
          _id   : { name: "$payments.name", type: "$payments.type" },
          total : { $sum: "$payments.amount" }
        }
      },
    ]);

    _daily_payments.forEach(payment => {
      if (payment._id.type === "CARD/DEBIT") payment._id.type = "DEBIT";
      if (!results[payment._id.type]) results[payment._id.type.toLowerCase()] = [];
    });

    _daily_payments.forEach(payment => {
      if (payment._id.type === "CARD/DEBIT") payment._id.type = "DEBIT";

      results[payment._id.type.toLowerCase()].push({ total: payment.total, ...payment._id });
    });

    return response.json({
      status  : true,
      message : "daily_payments",
      result  : results,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at daily_payments", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

module.exports = {
  create_transaction,
  get_order_number,
  get_transaction_history,
  today_sales,
  cash_income,
  non_cash_income,
  daily_payments,
  count_transaction,
};
