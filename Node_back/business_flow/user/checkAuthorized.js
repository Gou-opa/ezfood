var userpool = require('./../../database/userpool_schema');

console.log("Authorize engine is up");

authorizeVar = {

    ADMIN: 2,
    USER:1,
    unauthorized_message: {authorize : false, message: "Action is not allowed to perform!"},
    guess: {redirect: "login"}
}

var checker = function(uid, callback){
    userpool.findById(uid, (err, result) => {
        if(err) {
            console.log("loi query auth");
            callback(0);
        }
        else {
            if(JSON.stringify(result) == 'null'){
                console.log("Khong tim thay user/role");
                callback(0)
            }
            else{
                if(result.hasOwnProperty('role')){
                    console.log("user cu chua co role");
                    callback(0);
                }
                else{
                    console.log(`user with role ${result.role} - ${result.name} call API`);
                    callback(result.role);
                }
            }
        }
    });
}
module.exports =  authorizeVar;
module.exports.checker = checker;
