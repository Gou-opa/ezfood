var express = require('express');
var router = express.Router();
var menu = require('../database/dishpool_schema');
var tablepool = require('../database/tablepool_schema');
var levelpool = require('../database/levelpool_schema');
var orderpool = require('../database/orderpool_schema');
var userpool = require('../database/userpool_schema');
var historypool = require('../database/historypool_schema');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Welcome to manager page');
});

router.get('/table', function(req, res, next){
  res.json(
    [
      { 
        "booked": 15
      },
      {
        "empty": 30
      }
    ]
    
  );
});

var multer = require('multer');
var fs = require("fs");
var upload = multer({ dest: __dirname+ '/images/'});

// File input field name is simply 'file'
router.post('/upload', upload.single('file'), function(req, res) {
  var file = __dirname + '/React_front/' + req.file.filename;
  fs.rename(req.file.path, file, function(err) {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      res.status(200).json({});
    }
  });
});

router.get('/order', function(req, res, next){
  orderpool.find(function(err, allorder){
    if(err) console.log("cant get order");
    else {
      
            res.json(allorder);
          
    }
  })
});
router.get('/ingredient', function(req, res, next){
  res.send('ingredient');
})
router.get('/recipe', function(req, res, next){
  res.send('recipe');
})
router.get('/warehouse', function(req, res, next){
  res.send('manager warehouse');
})
router.get('/employee', function(req, res, next){
  res.send('employee');
})
router.get('/employee/create', function(req, res, next){
  res.send('employee create');
})
router.get('/employee/customer', function(req, res, next){
  res.send('customer create');
})
router.get('/employee/user', function(req, res, next){
  res.send('Manage lower class user');  
})
router.get('/delete_all_table', function(req, res, next){
  tablepool.deleteMany({},function(err, result){
    console.log(JSON.stringify(result));
  });
  res.send('acction_history');
})
router.get('/delete_all_order', function(req, res, next){
  
  orderpool.deleteMany({},function(err, result){
    console.log(JSON.stringify(result));
  });
  res.send('acction_history');
})
router.get('/acction_history/serve', function(req, res, next){
  res.send('acction_history serve');
})
router.get('/acction_history/issue', function(req, res, next){
  res.send('acction_history issue');
});
router.post("/dish", function(req,res){
  var dishform = req.body;
  console.log("adding dish " + JSON.stringify(dishform));
  menu.create(dishform, function(err,result){
    if(err) throw err;
    else {
      console.log("1 dish added to menu");
      console.log(result);
    }
  });
  res.status(200).json({});
});
router.post("/table/add", function(req,res){
  var tableform = req.body;
  console.log("adding table " + tableform);
  tablepool.create(tableform, function(err,result){
    if(err) throw err;
    else {
      console.log("1 table added");
      console.log(result);
      res.status(200).json({});
    }
  });
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

router.get("/order/preview/:id" , function(req, res){
  var oid = req.params.id;
  orderpool.findById(oid, function(err, order){
    if(err) console.log("order not found");
    else {
      console.log("found");
      res.json(order);
    }
      
  });
})
/*
             
              
              
              
              
*/
router.post('/paid', function(req, res){
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
          if(err) res.status(409).json({});
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
                            "billed":histo.billed
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
});
      
 
module.exports = router;
