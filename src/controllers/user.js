"use strict"

const model = require('../models/mongo');
const jwt   = require("jsonwebtoken");

async function check_config(request, response) {
  try {
    const _store      = await model.store.findOne({ id: request.body.store_id });
    const _outlet     = await model.outlet.findOne({ id: request.body.outlet_id });
    const _payment    = await model.payment.findOne({ outlet_id: request.body.outlet_id });
    const _sales_type = await model.sales_type.findOne({ outlet_id: request.body.outlet_id });
    const _config     = await model.config.findOne({ outlet_id: request.body.outlet_id });

    if (!_store || !_outlet || !_payment || !_sales_type || !_config) {
      return response.json({
        status  : false,
        message : "Account is not synchronized!",
        result  : null,
      });
    }

    return response.json({
      status  : true,
      message : "Account synchronized!",
      result  : true,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at set_user", error);
    console.log('====================================');

    return response.status(200).json({
      status  : false,
      message : error,
      result  : null,
    });
  }
}

async function sign_in(request, response) {
  try {
    console.log("body", request.body);
    if (request.query.src === "user-id") {
      const _account = await model.user
        .findOne({
          user_id : request.body.pos_id,
          user_pin: request.body.pos_pin,
          machine : request.headers.machine,
        });

      if (!_account) {
        return response.json({
          status  : false,
          message : "Invalid User ID / PIN!",
          result  : null,
        });
      }

      const _store      = await model.store.findOne({ id: _account.store_id });
      const _outlet     = await model.outlet.findOne({ id: _account.outlet_id });
      const _payment    = await model.payment.findOne({ outlet_id: _account.outlet_id });
      const _sales_type = await model.sales_type.findOne({ outlet_id: _account.outlet_id });
      const _config     = await model.config.findOne({ outlet_id: _account.outlet_id });

      if (!_store || !_outlet || !_payment || !_sales_type || !_config) {
        return response.json({
          status  : false,
          message : "Account is not synchronized!",
          result  : null,
        });
      }

      return response.json({
        status  : true,
        message : "sign_in",
        result  : {
          access: _account.access,
          info: {
            email     : _account.email,
            id        : _account.id,
            name      : _account.name,
            outlet_id : _account.outlet_id,
            store_id  : _account.store_id,
          },
        },
      });
    } else if (request.body.src === "mixed") {
      const _account = await model.employee
        .findOne({
          email : request.body.email,
          machine : request.headers.machine,
        });
      const decoded_pin = jwt.verify(_account._doc.pos_pin, request.headers.machine);

      console.log("pos_pin", decoded_pin, request.body.pos_pin);
      console.log("store_id", _account);
      console.log("outlet_id", _account._doc.outlet_id);

      if (!_account || decoded_pin.pin !== request.body.pos_pin) {
        return response.json({
          status  : false,
          message : "Invalid User ID / PIN!",
          result  : null,
        });
      }

      const _store      = await model.store.findOne({ id: _account._doc.store_id });
      const _outlet     = await model.outlet.findOne({ id: _account._doc.outlet_id });
      const _payment    = await model.payment.findOne({ outlet_id: _account._doc.outlet_id });
      const _sales_type = await model.sales_type.findOne({ outlet_id: _account._doc.outlet_id });
      const _config     = await model.config.findOne({ outlet_id: _account._doc.outlet_id });

      console.log("_store", _store);
      console.log("_outlet", _outlet);
      console.log("_payment", _payment);
      console.log("_sales_type", _sales_type);
      console.log("_config", _config);

      if (!_store || !_outlet || !_payment || !_sales_type || !_config) {
        return response.json({
          status  : false,
          message : "Account is not synchronized!",
          result  : null,
        });
      }

      return response.json({
        status  : true,
        message : "sign_in",
        result  : {
          access: _account.access,
          info: {
            email     : _account.email,
            id        : _account.id,
            name      : _account.name,
            outlet_id : _account.outlet_id,
            store_id  : _account.store_id,
          },
        },
      });
    } else {
      const _account = await model.user
        .findOne({
          email   : request.body.email,
          machine : request.headers.machine,
        });

      if (!_account) {
        return response.status(200).json({
          status  : false,
          message : "Invalid Email / Password!",
          result  : null,
        });
      }

      const _store      = await model.store.findOne({ id: _account.store_id });
      const _outlet     = await model.outlet.findOne({ id: _account.outlet_id });
      const _payment    = await model.outlet_payment.findOne({ outlet_id: _account.outlet_id });
      const _sales_type = await model.outlet_sales_type.findOne({ outlet_id: _account.outlet_id });
      const _config     = await model.outlet_config.findOne({ outlet_id: _account.outlet_id });

      if (!_store || !_outlet || !_payment || !_sales_type || !_config) {
        return response.json({
          status  : false,
          message : "Account is not synchronized!",
          result  : null,
        });
      }

      const _password = jwt.decode(_account.password, request.headers.machine);

      if (_password === request.body.password.trim()) {
        return response.json({
          status  : true,
          message : "sign_in",
          result  : {
            access: _account.access,
            info: {
              email     : _account.email,
              id        : _account.id,
              name      : _account.name,
              outlet_id : _account.outlet_id,
              store_id  : _account.store_id,
            },
          },
        });
      } else {
        return response.json({
          status  : false,
          message : "Wrong Password!",
          result  : null,
        });
      }
    }
  } catch (error) {
    console.log('====================================');
    console.log("error at set_user", error);
    console.log('====================================');

    return response.status(200).json({
      status  : false,
      message : error,
      result  : null,
    });
  }
}

async function set_list_employee(request, response) {
  try {
    console.log(request.headers)
    await model.employee.deleteMany();
    await model.employee.create(request.body);

    return response.send("OK!");
  } catch (error) {
    console.log('====================================');
    console.log("error at set_list_employee", error);
    console.log('====================================');

    return response.status(200).json({
      status  : false,
      message : error,
      result  : null,
    });
  }
}

async function get_employee_access(request, response) {
  try {
    const employee = await model.employee
      .findOne({ employee_id: request.body.id });
    
    return response.json({
      status  : true,
      message : "get access",
      result  : employee,
    });
  } catch (error) {
    console.log('====================================');
    console.log("error at get_employee_access", error);
    console.log('====================================');

    return response.status(200).json({
      status  : false,
      message : error,
      result  : null,
    });
  }
}

async function get_list_employee(request, response) {
  try {
    let employee = await model.employee
      .find({ machine: request.headers.machine })
      
    employee = employee.map(account => account._doc.email);

    return response.json(employee);
  } catch (error) {
    console.log('====================================');
    console.log("error at get_employee_access", error);
    console.log('====================================');

    return response.status(200).json({
      status  : false,
      message : error,
      result  : null,
    });
  }
}

async function set_user(request, response) {
  try {
    let password;

    if (request.body.password && request.body.password.length) {
      password = jwt.sign(request.body.password, request.body.machine)
    }

    const find_user = await model.user
      .findOne({ id : request.body.id });

    if (find_user) {
      const finded_user = {
        id        : find_user.id,
        user_id   : !find_user.user_id.length  && request.body.user_id  && request.body.user_id.length  ? request.body.user_id  : find_user.user_id,
        user_pin  : !find_user.user_pin.length && request.body.user_pin && request.body.user_pin.length ? request.body.user_pin : find_user.user_pin,
        email     : !find_user.email.length    && request.body.email    && request.body.email.length    ? request.body.email    : find_user.email,
        password  : !find_user.password.length && request.body.password && request.body.password.length ? password              : find_user.password,
        name      : find_user.name,
        store_id  : find_user.store_id,
        outlet_id : find_user.outlet_id,
        access    : find_user.access,
        machine   : find_user.machine,
      }

      await model.user
        .updateOne(
          { id: request.body.id },
          { $set: finded_user },
        );
    } else {
      await model.user.create(request.body);
    }

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

module.exports = {
  check_config,
  sign_in,
  set_user,
  set_list_employee,
  get_employee_access,
  get_list_employee,
};
