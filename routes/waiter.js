var express = require('express');
var router = express.Router();
//var tempMenu = require('./../tempMenu.js');

var tablepool = require('../database/tablepool_schema');
var levelpool = require('../database/levelpool_schema');
var catalogpool = require('../database/catalog_schema');
var userpool = require('../database/userpool_schema');
var orderpool = require('../database/orderpool_schema');
var dishpool = require('../database/dishpool_schema');
var historypool = require('../database/historypool_schema');
/* GET users listing. */
router.get('/', function(req, res) {
  res.send('Welcome to waiter page');
});
router.get('/all_order', function(req, res){
  orderpool.find({}, function(err, resu){
    if(err) console.log("order pool trong hoac query loi");
    else res.json(resu);
  })
  res.send();
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
  orderpool.count(function(err, count) {
    var order = {
      "uid": customer,
      "tid": table,
      "status" : 1
    }
    orderpool.create(order, function(err, resu){
      if(err) console.log("Create order failed");
      else {
        orderpool.findOne(order, function(err, output){
          tablepool.findOne({"tid":table}, function(err){
            if(err)console.log("notfound");
            else console.log("found");
          })
          tablepool.updateOne({"tid":table}, {$set: {"ispick" : { "is" : true, "uid": customer, "oid": output._id}}}, function(err,result){
            if(err) console.log("cant update table");
            else {
                console.log("Updated "+ JSON.stringify(table) + " with " + JSON.stringify({"uid" : customer }));
                console.log(result);
                userpool.updateOne({"_id" : customer}, {$set: {"currenttable" : table }}, function(err,result){
                  if(err) console.log("User id or table not found");
                  else {
                    console.log("User "+ customer + " sat at " + JSON.stringify(table));
                    console.log(result);
                    
                  }
                });
            }
          });
          console.log(output);
          res.status(200).json(output);
        });
      }
    });
  });
  
});

router.post('/order/add', function(req, res){
  console.log(req.body);
  var orderid = req.body.order_id;
  orderpool.findOne({"_id" : orderid}, function(err, result){
    if(err) res.json({"result":"khong tim thay order"});
    else{
      //tim thay order
      var newdish = req.body.dish;
      console.log("dishlist la:");
      console.log(newdish + " co type la "+ typeof(newdish));
      orderpool.findById(orderid, function(err, resultFind){
        if(err) console.log("Khong tim thay order");
        else {
          console.log(JSON.stringify(resultFind));
          
          var adddish = 
          {
            dish: {
                
                "type": newdish.type,
                "name": newdish.name,
                "price": newdish.price,
                "unit": newdish.unit
            },
            quantity: 1,
            status: 1
            
          };

            
          orderpool.updateOne({"_id": orderid}, {$push:{dishes : adddish}}, function(err, afterupdate){
            if(err) console.log("them mon failed, err: " + err);
            else {
              orderpool.findById(orderid, function(err, resuFind){
                if(err) console.log("Khong tim thay order");
                else {
                  res.json(resuFind);
                }
              });
            
            }
          });
          
        }
      });
    }
  });
});
/*
router.post('/pay', function(req, res){
  orderpool.findById(req.body.orderid, function(err,order){
    if(err) console.log("Khong tim thay don hang");
    else{
      orderpool.findByIdAndUpdate(order._id, {$set: {status: 3}} , function(err, resu){
        if(err) res.json({"status":false});
        else res.json({"status":req.body.estimate});
      });
    }
  });
});
*/

router.get('/profile/order_history', function(req, res){
  res.send('order_history');
})

module.exports = router;
