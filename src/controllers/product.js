"use strict"

const model = require('../models/mongo');

async function set_list_product_promotion(request, response) {
  try {
    console.log("set_list_product");
    console.log(JSON.stringify(request.body, 0, 2));
    console.log("set_list_product");
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

async function set_list_product_category(request, response) {
  try {
    console.log("set_list_product");
    console.log(JSON.stringify(request.body, 0, 2));
    console.log("set_list_product");
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

async function set_list_product(request, response) {
  try {
    console.log("set_list_product");
    console.log(JSON.stringify(request.body, 0, 2));
    console.log("set_list_product");
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
  set_list_product,
  set_list_product_category,
  set_list_product_promotion,
};
