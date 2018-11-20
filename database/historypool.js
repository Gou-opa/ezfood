var mongoose = require('mongoose');

var historySchema = new mongoose.Schema({
    user: {
        uid: String,
        name: String,
    },
    orderid: String,
    table: {
        level: Number,
        num: Number
    },
    dishes: [
        {

        }
    ],
    estimate: Number,
    billed: Number,
    discount: {
        discount_id: String,
        value: Number,
        type: Number // 1 la percent, 2 la $
    },
    create: {type:Date, default:Date.now}

     
});

var historypool = mongoose.model("historypool", historySchema);



module.exports = historypool;