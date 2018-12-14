var express = require('express');
var router = express.Router();

router.get('/:id', function(req,res){
    res.sendFile("C:/Users/Chit-Server/Dev/ezfood/React_front/public/images/>"+req.params.id);
})
module.exports = router;