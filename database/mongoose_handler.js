var mongoose = require('mongoose');
//var mongodb = require('mongo');
//var orderpoolScheme = require('./orderpool_schema');

//Business Flow APIs defines

var url = 'mongodb://192.168.1.16:27017/ezfood';
mongoose.url = url;

mongoose.connect(url);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("mongoose connected");
});


db.schema = {
    "orderschema": require('./orderpool_schema'),
    "userschema": require('./userpool_schema')
}

//make a gateway for calling BF APIs
console.log("mongohandler said welcome to mongoHandler");
db.text = "welcome to mongoHandler";
//console.log("mongohandler said: "+db.BF.user.text);
module.exports = db;