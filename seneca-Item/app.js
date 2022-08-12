module.exports = function math(options) {
  const { ObjectID } = require('bson');
  var moment = require('moment'); // require
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/"

  this.add('role:item,cmd:get', (msg, respond) => {

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("testMongo");
      dbo.collection("itemStore").find({}).toArray(function (err, data) {
        if (err) throw err;
        // res.json({ data });
        respond(null, { data })
        db.close();
      });
    });

  })

  this.add('role:item,cmd:create', (msg, respond) => {

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("testMongo");
      var myobj = msg.req.body.data;
      myobj.create_at = moment().format("YYYY-MM-DD HH:mm:ss");
      dbo.collection("itemStore").insertOne(myobj, function (err, data) {
        if (err) throw err;
        console.log("create success");
        // res.json({ data });
        dbo.collection("itemStore").find({}).toArray(function (err, data) {
          if (err) throw err;
          respond(null, { data })
          db.close();
        });
      });
    });

  })

  this.add('role:item,cmd:update', (msg, respond) => {

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("testMongo");
      var newdata = msg.req.body.data;

      var myquery = { _id: new ObjectID(newdata._id) };
      delete newdata._id
      var newvalues = { $set: newdata };
      // console.log(myquery);
      dbo.collection("itemStore").updateMany(myquery, newvalues, function (err, data) {
        if (err) throw err;
        console.log("edit success");
        dbo.collection("itemStore").find({}).toArray(function (err, data) {
          if (err) throw err;
          respond(null, { data })
          db.close();
        });
      });
    });

  })

  this.add('role:item,cmd:delete', (msg, respond) => {

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("testMongo");
      // console.log(req.body.data);
      var myquery = {
        _id: new ObjectID(msg.req.body.data._id)
      };
      dbo.collection("itemStore").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log(" document(s) deleted");
        dbo.collection("itemStore").find({}).toArray(function (err, data) {
          if (err) throw err;
          respond(null, { data })
          db.close();
        });
      });
    });

  })

}
