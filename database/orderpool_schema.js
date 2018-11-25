var mongoose = require('mongoose');

var orderpoolSchema = new mongoose.Schema({
    order_id: String,
    dishes: 
    [
        {
            dish: {
                type: Number,
                name: String,
                price: Number,
                unit: String
            },
            quantity: {type: Number, min: 1},
            option: {
                ingredient: [String],
                cook: [String],
                decoration: [String]
            }
            
        }
    ],
    uid: String,
    status: Number, // 1 là init, 2 là dang gọi đang ăn, 3 là chờ thanh toán
    create: {type:Date, default:Date.now}
    
});

orderpoolSchema.statics.findbyname = function(dishname){
    return this.find({"dishname": dishname});
}
var orderpool = mongoose.model("orderpool", orderpoolSchema);



module.exports = orderpool;