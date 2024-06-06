"use strict"

const PowerShell = require("powershell");

module.exports = async (cmd) => {
  try {
    return new Promise((resolve, reject) => {
      // Start the process
      let ps = new PowerShell(cmd, { executionpolicy: 'bypass' });

      // Handle process errors (e.g. powershell not found)
      ps.on("error", err => {
        console.error(err);

        reject(err);
      });

      // Stdout
      ps.on("output", data => {
        console.log("success", data);

        resolve(data);
      });

      // Stderr
      ps.on("error-output", data => {
        console.error(data);

        reject(data);
      });

      // End
      ps.on("end", code => {
        // Do Something on end
        console.log("end", code);

        resolve(code);
      });
    });
  } catch (error) {
    console.log("#error:powershell-runner", error);

    return error;
  }
}