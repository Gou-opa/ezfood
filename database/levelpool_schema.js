var mongoose = require('mongoose');

var levelSchema = new mongoose.Schema({
    
    level: Number,
    display : String
    
});

var levelpool = mongoose.model("levelpool", levelSchema);



module.exports = levelpool;