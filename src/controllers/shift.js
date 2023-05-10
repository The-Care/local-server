"use strict"

async function set_shift(request, response) {
  try {
    console.log("set_shift");
    console.log(JSON.stringify(request.body, 0, 2));
    console.log("set_shift");

    return response.json({
      status  : true,
      message : "set_shift",
      result  : null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_shift", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

module.exports = { set_shift };
