var mysql = require('mysql');
var AWS_mysql_user_config = {
    host: "ezfood.cdsh11aykflr.us-east-1.rds.amazonaws.com",
    user: "dev",
    password: "nerdezfood",
    database: "ezfood"
};
var db = mysql.createConnection(AWS_mysql_user_config);

db.connect(function(err){
    if(err) {
        console.log("Connect failed !");
        throw err;
    }
    else console.log("AWS MySQL Database connected !");
});

module.exports = db;
