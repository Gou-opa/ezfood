var express = require('express');
var router = express.Router();

router.get('/:id', function(req,res){
    res.sendFile("/home/gou/Dev/ezfood/images/"+req.params.id);
})
module.exports = router;