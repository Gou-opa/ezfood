var express = require('express');
var router = express.Router();
var menu = require('../database/dishpool_schema');
var tablepool = require('../database/tablepool_schema');
var levelpool = require('../database/levelpool_schema');
var orderpool = require('../database/orderpool_schema');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Welcome to manager page');
});

router.get('/dashboard', function(req, res, next){
  res.send('manager dashboard');
})
router.get('/orderwait', function(req, res, next){
  res.send('order waiting');
})
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
})
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
module.exports = router;
