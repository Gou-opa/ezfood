var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.sendFile('/home/gou/Dev/ezfood/React_front/build/index.html');
});

router.use('/users', require('./users'))
router.use('/login', require('./login'))

module.exports = router;
