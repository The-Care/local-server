"use strict"

async function set_config(request, response) {
  try {
    console.log("set_config");
    console.log(JSON.stringify(request.body, 0, 2));
    console.log("set_config");

    return response.json({
      status  : true,
      message : "set_config",
      result  : null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_config", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

module.exports = { set_config };
