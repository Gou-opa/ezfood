var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    uid: Number,
    "username": String,
    "password": String,
    "name": String,
    "currentorder": Number
});

userSchema.statics.findbyname = function(dishname){
    return this.find({"dishname": dishname});
}
var userpool = mongoose.model("userpool", userSchema);



module.exports = userpool;