var express = require('express');
var router = express.Router();
//var tempMenu = require('./../tempMenu.js');

var tablepool = require('../database/tablepool_schema');
var levelpool = require('../database/levelpool_schema');
var catalogpool = require('../database/catalog_schema');
var menu = require('../database/dishpool_schema');
var userpool = require('../database/userpool_schema');
var orderpool = require('../database/orderpool_schema');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('Welcome to waiter page');
});
router.get('/dashboard', function(req, res){
  res.send('dashboard');
});
router.post("/dish", function(req,res){
  var dishform = req.body;
  console.log("adding dish " + dishform);
  menu.create(dishform, function(err,result){
    if(err) throw err;
    else {
      console.log("1 dish added to menu");
      console.log(result);
    }
  });
  res.status(200).json({});
});
router.get('/menu', function(req, res){
  catalogpool.aggregate([{
    $lookup: {
        from: "dishpools", // collection name in db
        localField: "type",
        foreignField: "type",
        as: "dishes"
    }
  }]).exec(function(err, result) {
    if(err) throw err;
    else res.json({"menu":result});
  });
  
})
router.get('/menu/trend', function(req, res){
  res.send('Foods trend');
})
router.get('/order', function(req, res){
  
  res.json({});
})
// "floor": [
//   {
//     "level": 1,
//     "display": "Đại sảnh tầng 1",
//     "table" : 
//     [
//       {
//         "tid": "adajoaoa",
//         "num": 1,
//         "capacity": 6,
//         "uid" : ""
//       },
router.get('/table', function(req, res){
  levelpool.aggregate([{
    $lookup: {
        from: "tablepools", // collection name in db
        localField: "level",
        foreignField: "level",
        as: "tables"
    }
  }]).exec(function(err, result) {
    if(err) throw err;
    else res.json({"floors":result});
  });
})

router.post("/table/pick", function(req,res){
  var customer = req.body.uid;
  var table = req.body.table; //{level: ,num: }
  console.log(customer + " picked table "+ JSON.stringify(table));
  tablepool.updateOne(table, {$set: {"uid" : customer }}, function(err,result){
    if(err) throw err;
    else {
        console.log("Updated "+ JSON.stringify(table) + " with " + JSON.stringify({"uid" : customer }));
        console.log(result);
        userpool.updateOne({"_id" : customer}, {$set: {"currenttable" : table }}, function(err,result){
          if(err) console.log("User id or table not found");
          else {
            console.log("User "+ customer + " sat at " + JSON.stringify(table));
            console.log(result);
            orderpool.count(function(err, count) {
              var order = {
                "uid": customer,
                "orderid" : count+1
              }
              orderpool.create(order, function(err){
                if(err) console.log("Create order failed");
                else res.status(200).json(order);
              });
              
            });
          }
        });
        
    }
  });
  
  
});

router.post("/table/add", function(req,res){
  var tableform = req.body;
  console.log("adding table " + tableform);
  tablepool.create(tableform, function(err,result){
    if(err) throw err;
    else {
      console.log("1 table added");
      console.log(result);
    }
  });
  res.status(200).json({});
});
router.post("/level", function(req,res){
  var levelform = req.body;
  console.log("building level " + levelform);
  levelpool.create(levelform, function(err,result){
    if(err) throw err;
    else {
      console.log("1 level added");
      console.log(result);
    }
  });
  res.status(200).json({});
});

router.get('/profile', function(req, res){
  res.send('profile');
})
router.get('/profile/order_history', function(req, res){
  res.send('order_history');
})

module.exports = router;
