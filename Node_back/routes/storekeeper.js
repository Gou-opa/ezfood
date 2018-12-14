var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('Welcome to store keeper page');
});
router.get('/all', function(req, res){
  res.json(
    {
      "storage": 
      [
        {
          "_id": "43134346jrhhbg",
          "name": "Thit nac vai",
          "quantity": 45.7,
          "unit": "Kg",
          "status": "Ready",
          "import-date": "10-10-2018",
          "expire-date": "10-11-2018"
        },
        {
          "_id": "43134346jrhhbg",
          "name": "Tom hum xanh",
          "quantity": 6,
          "unit": "Con",
          "status": "Dong lanh",
          "import-date": "10-9-2018",
          "expire-date": "10-12-2018"
        }
      ]
    }
  );
});
router.get('/import', function(req, res){
  res.send('import');
})
router.get('/status', function(req, res){
  res.send('status');
})
router.get('/expire', function(req, res){

  res.send('expire');
})
router.get('/acction_history', function(req, res){
  res.send('acction_history');
})
router.get('/acction_history/report', function(req, res){
  res.send('general report');
})
router.get('/acction_history/issue', function(req, res){
  res.send('issue');
})
router.get('/acction_history/receipt', function(req, res){
  res.send('receipt');
})


module.exports = router;
