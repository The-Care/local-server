"use strict"

async function set_sales_type(request, response) {
  try {
    return response.json({
      status  : true,
      message : "set_sales_type",
      result  : null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_sales_type", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

module.exports = { set_sales_type };
