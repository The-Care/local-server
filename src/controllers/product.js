"use strict"

async function set_list_product(request, response) {
  try {
    console.log("set_list_product");
    console.log(JSON.stringify(request.body, 0, 2));
    console.log("set_list_product");

    return response.json({
      status  : true,
      message : "set_list_product",
      result  : null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_list_product", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

module.exports = { set_list_product };
