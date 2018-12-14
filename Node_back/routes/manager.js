var express = require('express');
var router = express.Router();
var menu = require('../database/dishpool_schema');
var tablepool = require('../database/tablepool_schema');
var levelpool = require('../database/levelpool_schema');
var orderpool = require('../database/orderpool_schema');
var userpool = require('../database/userpool_schema');
var historypool = require('../database/historypool_schema');
const busboy = require('connect-busboy');   // Middleware to handle the file upload https://github.com/mscdex/connect-busboy
const path = require('path');               // Used for manipulation with path
const fs = require('fs-extra'); 

const authorize  = require('./../business_flow/user/checkAuthorized');



/* GET users listing. */
router.get('/:uid', function(req, res) {
  authorize.checker(req.params.uid, function(role){
    console.log(role);
    if( role == authorize.ADMIN){
      res.send('Welcome to manager page');
    }else if(authorize.USER  == role) res.status(403).json(authorize.unauthorized_message);
    else res.status(200).json(authorize.guess);
  });
});

router.get('/evaluate/:uid', function(req, res){
  authorize.checker(req.params.uid, function(role){
    console.log(role);
    if( role == authorize.ADMIN){
      var lastDayOfMonth = function(y,m){
        return  new Date(y, m +1, 0).getDate();
      }
      var datetime = new Date();
      var year = datetime.getFullYear();
      var month = datetime.getMonth() + 1;
      var day = lastDayOfMonth(year, month - 1);

      var startDate = `${year}-${month}-01 00:00:00.001`;
      var endDate = `${year}-${month}-${day} 23:59:59.999`;
      
      var insight = [];
      function checkExists(day){
        var isExists = false;
        insight.forEach(element => {
          if(element.Day == day){
            isExists = true;
          }
        });
        return isExists;
      }

      historypool.find({"paid_time":{"$gt": startDate, "$lt": endDate } }, function(err, result){
        if (err) throw err;
        for(let i = 0; i < result.length; i++){
          var day = result[i].paid_time.getDate();

          var totalOfBill = 0;
          result[i].dishes.forEach(element =>{
            totalOfBill += element.dish.price * element.quantity;
          });
          if(checkExists(day) == false){
            insight.push({
              "Day":day,
              "value":totalOfBill
            });
          }else{
            insight[insight.findIndex(element => element.Day == day)].value += totalOfBill;
          }
        }
        insight.forEach(element => {
          var day = element.Day;
          element.Day = `${year}-${month}-${day}`;
        });
        res.send(JSON.stringify(insight));
      });
    }
    else if(authorize.USER  == role) res.status(403).json(authorize.unauthorized_message);
    else res.status(402).json(authorize.guess);
  });
});

router.delete('/table/:uid', function(req, res){
  authorize.checker(req.params.uid, function(role){
    console.log(role);
    if( role == authorize.ADMIN){
      var tid = req.body.tid;
      tablepool.findOneAndDelete({"tid": tid }, function(err, ressu){
        if(err) {
          console.log("xoa failed");
          res.status(403).json({});
        }
        else {
          console.log("da xoa ban "+tid);
          res.status(200).json({});
        }
      })
    }
    else if(authorize.USER  == role) res.status(403).json(authorize.unauthorized_message);
    else res.status(402).json(authorize.guess);
  });
});


const multer = require("multer");

const storage = multer.diskStorage({
   destination: "./images/",
   filename: function(req, file, cb){
      cb(null,file.originalname);
   }
});

const upload = multer({
   storage: storage,
   limits:{fileSize: 10000000},
}).single("myImage");


router.post("/dish/:uid", function(req,res){
  authorize.checker(req.params.uid, function(role){
    console.log(role);
    if( role == authorize.ADMIN){
      var dishform = req.body;
      console.log("adding dish " + JSON.stringify(dishform));
      menu.create(dishform, function(err,result){
        if(err) {
          console.log("insert mon moi failed");
          res,status(500).json({});
        }
        else {
          console.log("1 dish added to menu");
          console.log(result);
          res.status(200).json({});
        }
      });
      //res.status(200).json({});
    }
    else if(authorize.USER  == role) res.status(403).json(authorize.unauthorized_message);
    else res.status(402).json(authorize.guess);
  });
});
router.delete("/dish/:uid", function(req,res){
  authorize.checker(req.params.uid, function(role){
    console.log(role);
    if( role == authorize.ADMIN){
      var dishid = req.body._id;
      console.log("deleting dish " + JSON.stringify(dishid));
      menu.findByIdAndDelete(dishid, function(err,result){
        if(err) {
          console.log("xoa mon moi failed");
          res,status(500).json({"delete": "that bai"});
        }
        else {
          console.log("1 dish added to menu");
          console.log(result);
          res.status(200).json({"delete": "thanh cong"});
        }
      });
      //res.status(200).json({});
    }
    else if(authorize.USER  == role) res.status(403).json(authorize.unauthorized_message);
    else res.status(402).json(authorize.guess);
  });
});

router.get('/order/:uid', function(req, res){
  authorize.checker(req.params.uid, function(role){
    console.log(role);
    if(role == authorize.ADMIN){
      orderpool.find(function(err, allorder){
        if(err) console.log("cant get order");
        else {
          orderpool.aggregate([{
            $lookup: {
              from: "tablepools", // collection name in db
              localField: "tid",
              foreignField: "tid",
              as: "tables"
            }
          }]).exec(function(err, result) {
            if(err) throw err;
            else res.json(result);
          });
        }
      })
    }
    else if(role === authorize.USER) {
      res.status(403).json(authorize.unauthorized_message);
    }
    else res.status(402).json(authorize.guess);
  });
});

router.get('/delete_all_table', function(req, res){
  tablepool.deleteMany({},function(err, result){
    console.log(JSON.stringify(result));
  });
  res.send('acction_history');
})
router.get('/delete_all_order', function(req, res){
  
  orderpool.deleteMany({},function(err, result){
    console.log(JSON.stringify(result));
  });
  res.send('acction_history');
})
router.get('/all_order/:uid', function(req, res){
  authorize.checker(req.params.uid, function(role){
    console.log(role);
    if(role == authorize.ADMIN){
      orderpool.find({}, function(err, resu){
        if(err) console.log("order pool trong hoac query loi");
        else res.json(resu);
      });
    }
    else if(role === authorize.USER) {
      res.status(403).json(authorize.unauthorized_message);
    }
    else res.status(402).json(authorize.guess);
  });
});
router.get('/acction_history/serve', function(req, res){
  res.send('acction_history serve');
})
router.get('/acction_history/issue', function(req, res){
  res.send('acction_history issue');
});

router.post("/table/add/:uid", function(req,res){
  authorize.checker(req.params.uid, function(role){
    console.log(role);
    if(role == authorize.ADMIN){
      var tableform = req.body;
      tableform.ispick = {is:false, uid:"", oid:""};
      console.log("adding table " + tableform);
       tablepool.create(tableform, function(err,result){
        if(err) throw err;
        else {
          console.log("1 table added");
          console.log(result);
          res.status(200).json({});
        }
      });
    }
    else if(role === authorize.USER) {
      res.status(403).json(authorize.unauthorized_message);
    }
    else res.status(402).json(authorize.guess);
  });
});

router.post("/level/:uid", function(req,res){
  authorize.checker(req.params.uid, function(role){
    console.log(role);
    if(role == authorize.ADMIN){
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
    }
    else if(role === authorize.USER) {
      res.status(403).json(authorize.unauthorized_message);
    }
    else res.status(402).json(authorize.guess);
  });
});

router.get("/order/preview/:tid/:uid" , function(req, res){
  authorize.checker(req.params.uid, function(role){
    console.log(`${role} của preview`);
    if(role == authorize.ADMIN){
      var tid = req.params.tid;
      orderpool.findOne({"tid": tid}, function(err, order){
        if(err) console.log("order not found " + tid);
        else {
          console.log("found");
          res.json(order);
        }
          
      });
    }
    else if(role === authorize.USER) {
      res.status(403).json(authorize.unauthorized_message);
    }
    else res.status(402).json(authorize.guess);
  });
})

router.post('/paid/:uid', function(req, res){
  authorize.checker(req.params.uid, function(role){
    console.log(role);
    if(role == authorize.ADMIN){
      var table = req.body.tid;
      var histo = {};
      console.log("Thanh toan "+ table);
      tablepool.findOne({"tid": table}, function(err,tableinfo){
        if(err) console.log("table not found");
        else if(JSON.stringify(tableinfo) == "null") console.log("sai tid");
        else {
          //console.log(tableinfo);
          
          histo.user = {"uid" : tableinfo.ispick.uid} ;
          histo.table = {
            "level" : tableinfo.level,
            "num": tableinfo.num,
            "capacity": tableinfo.capacity,
            "tid": tableinfo.tid
          };
          histo.discount = {
            "discount_id": "",
            "value": 10,
            "discount_type": 1 // 0 la not defined, 1 la percent, 2 la $
          };
          
          tablepool.updateOne({"tid": table}, {$set :{"ispick": {"is":false, "uid":"", "oid": ""} }}, function(err, output){
            var orderid_on_table = tableinfo.ispick.oid;
            orderpool.findById(orderid_on_table, function(err, order){
              if(err) res.status(409).json({"discription": "Khong tim thay order"});
              else {
                console.log(order);
                histo.dishes = order.dishes;
                histo.create_time = order.create;
                
                histo.estimate = 0;
                for(var i = 0; i< histo.dishes.length; i++){
                  histo.estimate += histo.dishes[i].quantity * histo.dishes[i].dish.price;
                }
                console.log("server count the monney = "+ histo.estimate);
                
                  if (histo.discount.type ==1) histo.billed = histo.estimate*(100-histo.discount.value)/100;
                  else if(histo.discount.type == 2) histo.billed = histo.estimate - histo.discount.value ;
                  else histo.billed = histo.estimate;

                  userpool.findById(histo.user.uid, function(err, userfound){
                    if(err) console.log("notfound user");
                    else {
                      console.log("user la: "+ userfound);
                      histo.user.name = userfound.name;
                      console.log("history la: " + JSON.stringify(histo));
                      
                      orderpool.findByIdAndDelete(orderid_on_table, function(err, outp){
                        if(err) console.log("cant delete order");
                        else {
                          historypool.create(histo, function(err, success){
                            if(err) console.log("cant save history "+err);
                            else res.status(200).json(
                              {
                                "server_estimate": histo.estimate,
                                "billed": histo.billed
                              });
                          });
                        }
                      });
                    };
                  });
                
              };
            });
          });
          
        };

      });
    }
    else if(role === authorize.USER) {
      res.status(403).json(authorize.unauthorized_message);
    }
    else res.status(402).json(authorize.guess);
  });
});
      
 
module.exports = router;
