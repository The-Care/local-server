"use strict"

async function set_list_voucher(request, response) {
  try {
    console.log("set_list_voucher");
    console.log(JSON.stringify(request.body, 0, 2));
    console.log("set_list_voucher");

    return response.json({
      status  : true,
      message : "set_list_voucher",
      result  : null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_list_voucher", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

module.exports = { set_list_voucher };
