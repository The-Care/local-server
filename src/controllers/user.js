"use strict"

async function set_user(request, response) {
  try {
    console.log("set_user");
    console.log(JSON.stringify(request.body, 0, 2));
    console.log("set_user");

    return response.json({
      status  : true,
      message : "set_user",
      result  : null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_user", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

module.exports = { set_user };
