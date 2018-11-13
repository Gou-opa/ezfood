var mongoose = require('mongoose');
//var mongodb = require('mongo');
//var orderpoolScheme = require('./orderpool_schema');

//Business Flow APIs defines
var BF_O = require('./../business_flow/order/CRUD'); 
var BF_H = require('./../business_flow/history/CRUD');
var BF_S = require('./../business_flow/storage/CRUD');
var BF_R = require('./../business_flow/report/CRUD');
var BF_U = require('./../business_flow/user/CRUD');
var url = 'mongodb://192.168.1.5:27017/ezfood';
mongoose.url = url;

mongoose.connect(url);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("mongoose connected");
});
var BF = {
    "order": BF_O,
    "history": BF_H,
    "report": BF_R,
    "storage": BF_S,
    "user" : BF_U
}
db.BF = BF;
db.schema = {
    "orderschema": require('./orderpool_schema'),
    "userschema": require('./userpool_schema')
}

//make a gateway for calling BF APIs
console.log("mongohandler said welcome to mongoHandler");
db.text = "welcome to mongoHandler";
console.log("mongohandler said: "+db.BF.user.text);
module.exports = db;