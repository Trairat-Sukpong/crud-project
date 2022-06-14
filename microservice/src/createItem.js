const { ObjectID } = require('bson');
var express = require('express');
var moment = require('moment'); // require
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/"

module.exports = function math(options) {

  this.add('role:update,cmd:create', function product(msg, respond,request) {
    console.log(request);
    respond( request );
    // MongoClient.connect(url, function (err, db) {
    //   if (err) throw err;
    //   var dbo = db.db("testMongo");
    //   var myobj = req.body.data;
    //   myobj.create_at = moment().format("YYYY-MM-DD HH:mm:ss");
    //   dbo.collection("itemStore").insertOne(myobj, function (err, data) {
    //     if (err) throw err;
    //     console.log("create success");
    //     // res.json({ data });
    //     dbo.collection("itemStore").find({}).toArray(function (err, data) {
    //       if (err) throw err;
    //       respond({ data });
    //       db.close();
    //     });
    //   });
    // });
  })

}
