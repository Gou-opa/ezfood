var mongoose = require('mongoose');

var historySchema = new mongoose.Schema({
    user: {
        uid: String,
        name: String
    },
    table: {
        level: Number,
        num: Number,
        tid: String,
        capacity: Number
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
        discount_type: Number // 1 la percent, 2 la $
    },
    create_time: {type: Date},
    paid_time:  {type:Date, default:Date.now}
     
});

var historypool = mongoose.model("historypool", historySchema);

module.exports = historypool;