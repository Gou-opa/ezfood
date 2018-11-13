var Mongo = require('mongodb').MongoClient;
var url = "mongodb://192.168.1.5:27017/";

var mognodb = Mongo.connect(url, function(err) {
  if (err) throw err;
});
module.exports = mognodb;