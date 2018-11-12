var db = require('./mysql_handler').bi_db;

db.history = {
    query: function(query){
        db.query(query, function(err, res){
            if(err) throw err;
            console.log(res);
        })
    }
}
/*
db.user = 
db.report = 
db.warehouse = 
*/

module.exports = db;