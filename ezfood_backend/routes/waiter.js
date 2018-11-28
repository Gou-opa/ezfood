var express = require('express');
var router = express.Router();
//var tempMenu = require('./../tempMenu.js');

var tablepool = require('../database/tablepool_schema');
var levelpool = require('../database/levelpool_schema');
var catalogpool = require('../database/catalog_schema');
var userpool = require('../database/userpool_schema');
var orderpool = require('../database/orderpool_schema');
var dishpool = require('../database/dishpool_schema');
var historypool = require('../database/historypool');
/* GET users listing. */
router.get('/', function(req, res) {
  res.send('Welcome to waiter page');
});
router.get('/dashboard', function(req, res){
  res.send('dashboard');
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
    else res.json(result);
  });
})

router.post("/table/pick", function(req,res){
  var customer = req.body.uid;
  var table = req.body.tid;
  console.log(customer + " picked table "+ JSON.stringify(table));
  tablepool.updateOne({"_id":table}, {$set: {"ispick" : { "is" : true, "uid": customer}}}, function(err,result){
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
                "status" : 1
              }
              orderpool.create(order, function(err, resu){
                if(err) console.log("Create order failed");
                else {
                  orderpool.findOne(order, function(err, output){
                    console.log(output);
                    res.status(200).json(output);
                  });
                }
              });
            });
          }
        });
    }
  });
});

router.post('/order/update', function(req, res){
  console.log(req.body);
  orderpool.findOne({"_id" : req.body.order_id}, function(err, result){
    if(err) res.json({"result":"khong tim thay order"});
    else{
      //tim thay order
      var dishlist = req.body.dishes;
      console.log("dishlist la:");
      console.log(dishlist);
      orderpool.findByIdAndUpdate(req.body.order_id, {$set:{dishes: dishlist, status: 2}}, function(err, resultupdate){
        if(err) console.log("them mon failed");
        else {
          console.log(resultupdate);
          res.json(resultupdate);
        }
      });
    }
  });
});
router.post('/pay', function(req, res){
  orderpool.findById(req.body.orderid, function(err,order){
    orderpool.findByIdAndUpdate(order.order_id, {$set: {status: 3}} , function(err, resu){
      if(err) res.json({"status":false});
      else res.json({"status":req.body.estimate});
    });
  });
});
router.post('/paid', function(req, res){
  orderpool.findById(req.body.orderid, function(err,order){
      if(err) console.log("order not found");
      else {
        console.log(JSON.stringify(order.dishes));
        
        
        for(var i = 0 ; i< order.dishes.length ; i++){
          var a_dish_in_order = order.dishes[i];
          dishpool.findOne(a_dish_in_order.dishid, function(err, dish){
            
            dishes_in_order[i].dishinfo = dish;
          });
        }
        // craft history
        var transaction = {};
        //transaction.user = 
        transaction.orderid = order._id;
        //transaction.dishes =
        //transaction.estimate = 
        //transaction.billed =
        //transaction.discount = 
        res.json(order);
        //historypool.

      }

    });
    });
      
 

router.get('/profile/order_history', function(req, res){
  res.send('order_history');
})

module.exports = router;
