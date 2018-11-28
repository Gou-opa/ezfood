var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Welcome to admin page');
});
router.get('/report', function(req, res, next){
  res.send('report');
})
router.get('/warehouse', function(req, res, next){
  res.send('warehouse');
})
router.get('/restaurant', function(req, res, next){
  res.send('restaurant');
})
router.get('/restaurant/finance', function(req, res, next){
  res.send('finance');
})
router.get('/restaurant/dishes', function(req, res, next){
  res.send('dishes');
})
router.get('/approvement', function(req, res, next){
  res.send('approvement');
})
router.get('/approvement/order', function(req, res, next){
  res.send('approvement order');
})
router.get('/approvement/serve', function(req, res, next){
  res.send('approvement serve');
})
router.get('/approvement/isue&receipt', function(req, res, next){
  res.send('approvement isue&receipt');
})
router.get('/employee', function(req, res, next){
  res.send('employee');
})
router.get('/employee/create', function(req, res, next){
  res.send('employee create');
})
router.get('/employee/edit', function(req, res, next){
  res.send('employee edit');
})


module.exports = router;
