var mongoose = require('mongoose');

var tableSchema = new mongoose.Schema({
    
    level: Number,
    tid: String,
    num: Number,
    capacity: Number,
    ispick : {
    	is : Boolean,
        uid: String,
        oid: String
    }
     
});

tableSchema.statics.findbyname = function(dishname){
    return this.find({"dishname": dishname});
}
var tablepool = mongoose.model("tablepool", tableSchema);



module.exports = tablepool;