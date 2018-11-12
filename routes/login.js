var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Welcome to login page');
});
router.post('/', function(req,res){
	var form = req.body;
	console.log(form);
	
});

module.exports = router;
