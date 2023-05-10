"use strict"

async function set_product_promotion(request, response) {
  try {
    console.log("set_product_promotion");
    console.log(JSON.stringify(request.body, 0, 2));
    console.log("set_product_promotion");

    return response.json({
      status  : true,
      message : "set_product_promotion",
      result  : null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_product_promotion", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

module.exports = { set_product_promotion };
