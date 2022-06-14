const { ObjectID } = require('bson');
var express = require('express');
var moment = require('moment'); // require
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/"

module.exports = function math(options) {

  this.add('role:update,cmd:edit', function product(msg, respond) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("testMongo");
      dbo.collection("itemStore").find({}).toArray(function (err, data) {
        if (err) throw err;
        respond({ data });
        db.close();
      });
    });
  })

}
