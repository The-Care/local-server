"use strict"

async function set_payment(request, response) {
  try {
    console.log("set_payment");
    console.log(JSON.stringify(request.body, 0, 2));
    console.log("set_payment");

    return response.json({
      status  : true,
      message : "set_payment",
      result  : null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_payment", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

module.exports = { set_payment };
