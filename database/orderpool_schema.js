var mongoose = require('mongoose');


var dishSchema = new mongoose.Schema({
    type: Number, //khai vi 1 mon chinh 2 trang mieng 3 do uong 4
    name: String,
    price: Number,
    unit: String
    
});
var orderpoolSchema = new mongoose.Schema({
    order_id: String,
    dishes: 
    [
        {
            dish: dishSchema,
            quantity: Number,
            status: Number // 1 la dang cho, 2 la nau xong, 3 la da phuc vu
            
        }
    ],
    uid: String,
    tid: String,
    estimate: Number,
    status: Number, // 1 là init, 2 là dang gọi đang ăn, 3 là chờ thanh toán
    create: {type:Date, default:Date.now}
    
});

orderpoolSchema.statics.findbyname = function(dishname){
    return this.find({"dishname": dishname});
}
var orderpool = mongoose.model("orderpool", orderpoolSchema);



module.exports = orderpool;