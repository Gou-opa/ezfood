var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Welcome to waiter page');
});
router.get('/dashboard', function(req, res, next){
  res.send('dashboard');
})
router.get('/menu', function(req, res, next){
  res.send('Menu');
})
router.get('/menu/trend', function(req, res, next){
  res.send('Foods trend');
})
router.get('/order', function(req, res, next){
  res.send('Order');
})
router.get('/profile', function(req, res, next){
  res.send('profile');
})
router.get('/profile/order_history', function(req, res, next){
  res.send('order_history');
})

module.exports = router;
