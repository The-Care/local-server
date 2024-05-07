const model  = require('../models/mongo');
const crypto = require('crypto');

async function ping(request, response) {
  try {
    return response.send("PONG!");
  } catch (error) {
    console.log("@error.ping", error);

    return response.send(error);
  }
}

async function get_db() {
  try {
    const { MongoClient } = require('mongodb');
    const urlToAtlasCluster = 'mongodb://localhost:27017';
    const client = new MongoClient(urlToAtlasCluster);

    await client.connect();

    const admin = client.db("admin");

    const dbs = await admin.command({ listDatabases: 1, nameOnly: true });
    const result = dbs.databases.map(({ name }) => name);
    
    return result;
  } catch (error) {
    console.log("error.get_dbs", error);
  }
}

async function create_db(request, response) {
  try {
    const databases = await get_db();

    if (databases.includes("posinfinite")) return response.send("OK!");

    const mongodb = require('mongodb');
    const uri = 'mongodb://localhost:27017';
    const client = new mongodb.MongoClient(uri);

    client.connect((err) => {
      if (!err) console.log('connection created');

      const newDB = client.db("posinfinite");
      newDB.createCollection("init");
    });

    return response.send("OK");
  } catch (error) {
    console.log("@error.create_db", error);

    return response.send("ERROR");
  }
}

async function ping(request, response) {
  try {
    return response.send("PONG!");
  } catch (error) {
    console.log("@error.ping", error);

    return response.send(error);
  }
}

async function get_many(request, response) {
  try {
    const codes = request.body.codes.map(el => `https://google.com/${el}`)
    const lists = await model.find().where('shorted').in(codes)

    return response.json(lists)
  } catch (error) {
    console.log('@error.get_many | ', error)

    return response.send(error)
  }
}

async function create(request, response) {
  try {
    const { base } = request.body
    const list     = await model.find({ full: base }).exec()
    let key        = crypto.scryptSync(base, 'balesin-url', 4).toString('hex')
    const is_exist = await model.find({ shorted: `${config.base}/${key}` }).exec()

    if (is_exist.length) {
      if (is_exist[0].full !== base) {
        key += `b-${is_exist.length}`
      }
    }

    if (list.length) {
      const updated = await model.findByIdAndUpdate(
        { _id : list[0]._id },
        { $set: {
          shorted  : `${config.base}/${key}`,
          expiredAt: ''
        } },
        { new: true }
      ).exec()

      return response.json(updated)
    }

    const created = await model.create({
      full   : base,
      shorted: `${config.base}/${key}`,
    })

    return response.json(created)
  } catch (error) {
    console.log('@create.error |', error)

    return response.send(error)
  }
}

module.exports = {
  create,
  get_many,
  ping,
  create_db,
}
