var mysql = require('mysql');
var AWS_mysql_user_config = {
    host: "ezfood.cdsh11aykflr.us-east-1.rds.amazonaws.com",
    user: "dev",
    password: "nerdezfood",
    database: "ezfood"
};
var Bi_Server_user_config = {
    host: "192.168.1.5",
    user: "btl",
    password: "webky1nam3",
    database: "ezfood"
}
var aws_mysql = mysql.createConnection(AWS_mysql_user_config);
var bi_mysql = mysql.createConnection(Bi_Server_user_config);
// aws_mysql.connect(function(err){
//     if(err) {
//         console.log("Connect to AWS failed !");
//         throw err;
//     }
//     else console.log("AWS MySQL Database connected !");
// });
bi_mysql.connect(function(err){
    if(err) {
        console.log("Connect to Bi's Server failed !");
        console.log(err);
    }
    else console.log("Bi's Server MySQL Database connected !");
});
// var db = 
// {
//     "aws_db": aws_mysql,
//     "bi_db": bi_mysql
// }
module.exports = bi_mysql;
