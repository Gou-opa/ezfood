var mongoose = require('mongoose');

var catalogSchema = new mongoose.Schema({
    
    type: Number,
    display : String
    
});
var catalogpool = mongoose.model("catalogpool", catalogSchema);



module.exports = catalogpool;