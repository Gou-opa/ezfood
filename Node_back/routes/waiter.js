var express = require('express');
var router = express.Router();
//var tempMenu = require('./../tempMenu.js');
const authorize  = require('./../business_flow/user/checkAuthorized');
var tablepool = require('../database/tablepool_schema');
var levelpool = require('../database/levelpool_schema');
var catalogpool = require('../database/catalog_schema');
var userpool = require('../database/userpool_schema');
var orderpool = require('../database/orderpool_schema');
var dishpool = require('../database/dishpool_schema');
var historypool = require('../database/historypool_schema');
/* GET users listing. */
router.get('/:uid', function(req, res) {
  authorize.checker(req.params.uid, function(role){
    console.log(role);
    if( role == authorize.USER){
      res.send('Welcome to waiter page');
    }
    else res.status(402).json(authorize.guess);
  });
});


router.get('/menu/:uid', function(req, res){
  authorize.checker(req.params.uid, function(role){
    console.log(role);
    if( role > 0){
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
    }
    else res.status(402).json(authorize.guess);
  });
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
router.get('/table/:uid', function(req, res){
  authorize.checker(req.params.uid, function(role){
    console.log(role);
    if( role > 0){
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
    }
    else res.status(402).json(authorize.guess);
  });
})

router.post("/table/pick", function(req,res){
  var customer = req.body.uid;
  var table = req.body.tid;
  console.log(customer + " picked table "+ JSON.stringify(table));
  authorize.checker(customer, function(role){
    console.log(role);
    if( role == authorize.USER){
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
    }
    else {
      res.status(402).json(authorize.guess);
    }
  });
});


router.delete('/order/dish/:uid', function(req, res){
  authorize.checker(req.params.uid, function(role){
    console.log(role);
    if( role == authorize.USER){
      console.log(req.body);
      var orderid = req.body.order_id;
      var dishid = req.body.did;
      orderpool.findOne({"_id" : orderid}, function(err, result){
        if(err) res.json({"result":"khong tim thay order"});
        else{
          //tim thay order
          orderpool.findByIdAndUpdate(orderid, {$pull:{"dishes": {_id: dishid}}}, function(err, output){
            if(err) console.log("xoa mon khoi order "+ order_id + " failed");
            else res.status(200).json({});
          });
        }
      });
    }
    else {
      res.status(402).json(authorize.guess);
    }
  });
});

router.post('/order/add/:uid', function(req, res){
  authorize.checker(req.params.uid, function(role){
    console.log(role);
    if( role == authorize.USER){
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
    }else res.status(402).json(authorize.guess);
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
