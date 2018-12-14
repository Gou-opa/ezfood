var express = require('express');
var router = express.Router();

router.get('/dish/:id', function(req,res){
    res.sendFile("C:/Users/Chit-Server/Dev/ezfood/React_front/public/images/dish/"+req.params.id);
})
router.get('/avatar/:id', function(req,res){
    res.sendFile("C:/Users/Chit-Server/Dev/ezfood/React_front/public/images/avatar/"+req.params.id);
})
module.exports = router;