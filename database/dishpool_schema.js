var mongoose = require('mongoose');

var dishSchema = new mongoose.Schema({
    type: Number,
    name: String,
    price: Number,
    unit: String,
    url: String
});


var dishpool = mongoose.model("dishpool", dishSchema);



module.exports = dishpool;