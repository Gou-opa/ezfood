var express = require('express');
var router = express.Router();
var localmongo = require('./../database/mongo_handler');
var db = localmongo.BF.user;
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Welcome to login page');
});

console.log("login router said: "+db.text);

router.post('/', function(req,res){
  var form = req.body;
  console.log(form);
});

router.post('/register',function(req,res){
  var form = req.body;
  db.insertOne(form, function(err, result){
    if(err) throw err;
    else result.redirect('/login');
  });
});


module.exports = router;
