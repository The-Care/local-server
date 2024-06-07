"use strict"

const model = require('../models/mongo');
const { shell } = require("../libraries");

async function get_config(request, response) {
  try {
    const config = await model.config
      .findOne({ outlet_id: +request.query.outlet_id });

    return response.json({
      status : config !== null,
      message: "set_config",
      result : config !== null ? config : null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_config", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

async function set_config(request, response) {
  try {
    await model.config
      .updateMany({ outlet_id: request.body.outlet_id }, { ...request.body }, { upsert: true });

    return response.json({
      status: true,
      message: "set_config",
      result: null,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_config", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

async function install_update(request, response) {
  try {
    console.log("install_update start");
   
    await waiting();

    console.log("install_update start >>>>>");

    let whoami = await shell('whoami');
    let pwd = await shell('pwd');

    console.log("whoami", whoami);
    console.log("pwd", pwd);

    whoami = whoami.split("\\")[1];

    console.log("whoami >", whoami);

    const install = await shell(`C:\\'Program Files'\\posinfinite-local-server\\posinfinite.exe`);

    console.log("uninstalled", install);

    await waiting();
    
    const install_b = await shell(`C:\\'Program Files'\\posinfinite-local-server\\posinfinite.exe`);

    console.log("install_b", install_b);

    await shell(`del C:\\'Program Files'\\posinfinite-local-server\\posinfinite.exe`);
    // await shell(`cd ../../../AppData/Local/posinfinite-updater/pending; del posinfinite.exe`);

    return response.send("OK!");
  } catch (error) {
    console.log('====================================');
    console.log("error at set_config", error);
    console.log('====================================');

    return response.status(400).send(error);
  }
}

function waiting() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 10000);
  })
}

module.exports = { get_config, set_config, install_update };
