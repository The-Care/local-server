"use strict"

const model = require('../models/mongo')

async function count_transaction(request, response) {
  try {
    const finded = await model.transaction
      .find({ identifier: request.query.identifier, status: "paid" })
      .count();

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

async function today_sales(request, response) {
  try {
    const total = await model.transaction
      .aggregate([
        { $match: { identifier: +request.query.identifier, status: "paid" } },
        { $group: { _id: null, total: { $sum: "$grand_total" } } },
      ]);

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
    const _cash_income = await model.transaction
      .find({ identifier: +request.query.identifier, "payments.type": "CASH", status: "paid" });

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
    const _non_cash_income = await model.transaction
      .find({
        identifier      : +request.query.identifier,
        status: "paid",
        "payments.type" : { "$in" : ["CARD/DEBIT", "OTHER"] }
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
    const _daily_payments = await model.transaction
      .aggregate([
        { $match : { identifier: +request.query.identifier, status: "paid" } },
        { $unwind: "$payments" },
        { $unwind: "$payments.name" },
        {
          $group: {
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
  today_sales,
  cash_income,
  non_cash_income,
  daily_payments,
  count_transaction,
};
