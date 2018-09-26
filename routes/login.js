var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Welcome to login page');
});

router.use('/storekeeper', require('./storekeeper'))
router.use('/customer', require('./customer'))
router.use('/waiter', require('./waiter'))
router.use('/manager', require('./manager'))
router.use('/admin', require('./admin'))


module.exports = router;
