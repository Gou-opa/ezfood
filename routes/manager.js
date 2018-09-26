var express = require('express');
var router = express.Router();

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
router.get('/acction_history', function(req, res, next){
  res.send('acction_history');
})
router.get('/acction_history/order', function(req, res, next){
  res.send('acction_history order');
})
router.get('/acction_history/serve', function(req, res, next){
  res.send('acction_history serve');
})
router.get('/acction_history/issue', function(req, res, next){
  res.send('acction_history issue');
})

module.exports = router;
