const { ObjectID } = require('bson');
var express = require('express');
var moment = require('moment'); // require
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/"

module.exports = function math( options ) { 

  // this.add( 'role:math,cmd:get', function sum( msg, respond ) {
  //   MongoClient.connect(url, function (err, db) {
  //     if (err) throw err;
  //     var dbo = db.db("testMongo");
  //     dbo.collection("itemStore").find({}).toArray(function (err, data) {
  //       if (err) throw err;
  //       respond({ data });
  //       db.close()
  //     });
  //   });
  // })

  this.add( 'role:math,cmd:create', function product( msg, respond ) {
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

  // this.add( 'role:math,cmd:edit', function sum( msg, respond ) {
  //   respond( null, { answer: "edit" } )
  // })

  // this.add( 'role:math,cmd:delete', function product( msg, respond ) {
  //   respond( null, { answer: "delete" } )
  
  // })

}
