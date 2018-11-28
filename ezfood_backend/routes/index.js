var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home page' });
});

router.use('/users', require('./users'))
router.use('/login', require('./login'))

module.exports = router;
