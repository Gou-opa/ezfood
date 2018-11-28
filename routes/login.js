var express = require('express');
var router = express.Router();
var localmongo = require('../database/mongoose_handler');
var pool = require('../database/userpool_schema');
var orderpool = require('../database/orderpool_schema');
var db = localmongo.BF.user;
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Welcome to login page');
});

//console.log("login router said: "+db.text);

router.post('/', function(req,res){
  var form = {"username" : req.body.username, "password": req.body.password};
  console.log(form);
  pool.findOne(form, function(err,result){
    console.log("In ra ket qua "+JSON.stringify(result));
    if(err) throw err;
    else {
      //transporter = res.toObject();
      if(JSON.stringify(result) == "null") {
          console.log(form + "sai user or pass");
          res.status(299).json({"result": "user or pass"});
      }
      else {
        if(req.body.username == result.username && req.body.password == result.password && req.body.password != null){
          var user = JSON.parse(JSON.stringify(result));
          delete user._id;
          console.log(user.username + "logged in");
          delete user.__v;
          delete user.password;
          delete user.username;
          user.uid = result._id;
          orderpool.findOne({"uid": user.uid}, function(err, order){
            user.order = order._id;
            res.status(200).json(user);
          });
        }
        else res.status(299).json({"result": "user or pass"});
      }
    }
  });
  

});

router.post('/register',function(req,res){
  var form = req.body;
  pool.findOne(form, function(err,result){
    if(err) throw err;
    else {
      if(JSON.stringify(result) != "null"){
        console.log(JSON.stringify(result));
        res.status(403).json({});
      }
      else {
        db.createUser(form, function(err, result){
          if(err) {
            res.status(404).json({});
            throw err;
          }
          else {
            console.log(result);
            res.status(200).json({});
            }
        });
      }
    }
  });
});


module.exports = router;
