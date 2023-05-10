"use strict"

async function set_outlet(request, response) {
  try {
    console.log("set_outlet");
    console.log(JSON.stringify(request.body, 0, 2));
    console.log("set_outlet");

    return response.json({
      status  : true,
      message : "set_outlet",
      result  : null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_outlet", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

module.exports = { set_outlet };
