var express = require('express');
var router = express.Router();

/* GET users listing. */
router.all('/', function(req, res, next) {
  res.send('Welcome to page 4XX');
});


module.exports = router;