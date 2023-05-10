"use strict"

async function set_product_category(request, response) {
  try {
    console.log("set_product_category");
    console.log(JSON.stringify(request.body, 0, 2));
    console.log("set_product_category");

    return response.json({
      status  : true,
      message : "set_product_category",
      result  : null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_product_category", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

module.exports = { set_product_category };
