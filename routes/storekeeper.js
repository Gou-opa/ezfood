var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Welcome to store keeper page');
});
router.get('/dashboard', function(req, res, next){
  res.send('dashboard');
})
router.get('/import', function(req, res, next){
  res.send('import');
})
router.get('/status', function(req, res, next){
  res.send('status');
})
router.get('/expire', function(req, res, next){
  res.send('expire');
})
router.get('/acction_history', function(req, res, next){
  res.send('acction_history');
})
router.get('/acction_history/report', function(req, res, next){
  res.send('general report');
})
router.get('/acction_history/issue', function(req, res, next){
  res.send('issue');
})
router.get('/acction_history/receipt', function(req, res, next){
  res.send('receipt');
})


module.exports = router;
