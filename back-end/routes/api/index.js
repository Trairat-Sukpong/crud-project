const { ObjectID } = require('bson');
var express = require('express');
var moment = require('moment'); // require
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/"


/* GET home page. */
router.post('/item/create', function (req, res, next) {

  // console.log(req.body);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("testMongo");
    var myobj = req.body.data;
    myobj.create_at = moment().format("YYYY-MM-DD HH:mm:ss");
    dbo.collection("itemStore").insertOne(myobj, function (err, data) {
      if (err) throw err;
      console.log("create success");
      // res.json({ data });
      dbo.collection("itemStore").find({}).toArray(function (err, data) {
        if (err) throw err;
        res.json({ data });
        db.close();
      });
    });
  });

});


router.get('/item/get', function (req, res, next) {

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("testMongo");
    dbo.collection("itemStore").find({}).toArray(function (err, data) {
      if (err) throw err;
      res.json({ data });
      db.close();
    });
  });

});


router.post('/item/edit', function (req, res, next) {

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("testMongo");
    var newdata = req.body.data;

    var myquery = { _id: new ObjectID(newdata._id) };
    delete newdata._id
    var newvalues = { $set: newdata };
    // console.log(myquery);
    dbo.collection("itemStore").updateMany(myquery, newvalues, function (err, data) {
      if (err) throw err;
      console.log("edit success");
      dbo.collection("itemStore").find({}).toArray(function (err, data) {
        if (err) throw err;
        res.json({ data });
        db.close();
      });
    });
  });

});

router.post('/item/delete', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("testMongo");
    console.log(req.body.data);
    var myquery = {
      _id: new ObjectID(req.body.data._id)
    };
    dbo.collection("itemStore").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log(" document(s) deleted");
      dbo.collection("itemStore").find({}).toArray(function (err, data) {
        if (err) throw err;
        res.json({ data });
        db.close();
      });
    });
  });
});

router.post('/item/deleteall', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("testMongo");
    var myquery = {};
    dbo.collection("itemStore").deleteMany(myquery, function (err, obj) {
      if (err) throw err;
      res.json(" document(s) deleted(all)");
      db.close();
    });
  });
});


module.exports = router;
