var mongoose = require('mongoose');

var dishSchema = new mongoose.Schema({
    type: Number, //khai vi 1 mon chinh 2 trang mieng 3 do uong 4
    name: String,
    price: Number,
    unit: String,
    url: String
});


var dishpool = mongoose.model("dishpool", dishSchema);



module.exports = dishpool;