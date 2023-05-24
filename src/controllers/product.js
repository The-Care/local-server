"use strict"

const model = require('../models/mongo');

async function get_list_product(request, response) {
  try {
    const product = await model.product.find();

    return response.json({
      status : product.length > 0,
      message: "set_payment",
      result : product,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at get_list_product", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

async function get_list_product_category(request, response) {
  try {
    const product_category = await model.product_category.find();

    return response.json({
      status : product_category.length > 0,
      message: "set_payment",
      result : product_category,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_list_product", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

async function set_list_product_category(request, response) {
  try {
    await model.product_category.deleteMany();

    const created = await model.product_category
      .create(request.body);

    return response.json({
      status  : true,
      message : "set_list_product",
      result  : created,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_list_product", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

async function set_list_product_promotion(request, response) {
  try {
    await model.product_promotion.deleteMany();

    const created = await model.product_promotion
      .create(request.body);

    return response.json({
      status  : true,
      message : "set_list_product",
      result  : created,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_list_product", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

async function get_list_product_promotion(request, response) {
  try {
    const product_promotion = await model.product_promotion.find();

    return response.json({
      status : product_promotion.length > 0,
      message: "set_payment",
      result : product_promotion,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_list_product", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

async function set_list_product(request, response) {
  try {
    await model.product.deleteMany();

    const created = await model.product
      .create(request.body);

    return response.json({
      status  : true,
      message : "set_list_product",
      result  : created,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_list_product", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

module.exports = {
  get_list_product,
  get_list_product_category,
  get_list_product_promotion,
  set_list_product,
  set_list_product_category,
  set_list_product_promotion,
};
