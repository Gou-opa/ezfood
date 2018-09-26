var mongoose = require('mongoose');
//var mongodb = require('mongo');
//var orderpoolScheme = require('./orderpool_schema');

//Business Flow APIs defines
var BF_O = require('./../business_flow/order/CRUD'); 
var BF_H = require('./../business_flow/history/CRUD');
var BF_S = require('./../business_flow/storage/CRUD');
var BF_R = require('./../business_flow/report/CRUD');

var url = 'mongodb://127.0.0.1:27017/ezfood';
mongoose.url = url;

mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("mongoose connected");
});
var BF = {
    "order": BF_O,
    "history": BF_H,
    "report": BF_R,
    "storage": BF_S
}
db.BF=BF;
//make a gateway for calling BF APIs
module.exports = db;