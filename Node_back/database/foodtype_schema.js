var mongoose = require('mongoose');

var foodtypeSchema = new mongoose.Schema({
    
    type: Number,
    display : String
    
});
var foodtypepool = mongoose.model("foodtypepool", foodtypeSchema);



module.exports = foodtypepool;