var mongoose = require('mongoose');

var orderpoolSchema = new mongoose.Schema({
    order_id: String,
    "dishname": String,
    quantity: {type: Number, min: 1},
    option: {
        ingredient: [String],
        cook: [String],
        decoration: [String]
    },
    receive_date : Date,
    create: {type:Date, default:Date.now},
});

orderpoolSchema.statics.findbyname = function(dishname){
    return this.find({"dishname": dishname});
}
var orderpool = mongoose.model("orderpool", orderpoolSchema);



module.exports = orderpool;