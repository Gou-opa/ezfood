var Mongo = require('mongodb').MongoClient;
var url = "mongodb://192.168.1.16.:27017/";


var mognodb = Mongo.connect(url, function(err, db) {
  if (err) throw err;
  db.db("ezfood").createCollection("historypools");
});

module.exports = mognodb;