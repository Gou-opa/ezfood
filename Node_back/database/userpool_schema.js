var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    uid: Number,
    "username": String,
    "password": String,
    "name": String,
    "currentorder": Number,
    "avatar": {type: String, default: "/images/avatar/default.png"},
    "role" : {type: Number , default: 1} //1 la user 2 la admin
});

userSchema.statics.findbyname = function(dishname){
    return this.find({"dishname": dishname});
}
var userpool = mongoose.model("userpool", userSchema);



module.exports = userpool;