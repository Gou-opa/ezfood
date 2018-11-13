var pool = require('../../database/userpool_schema');
//var url = mongodb.url;


//var neworder = new order(objorder);


var user_api = {
    count: function(query_filter){
        pool.count(query_filter, function(err,res){
            if(err) throw err;
            else console.log("User counted "+ res);
        });
    },
    insertOne: function(objuser){
        console.log("inserting...");
        pool.create(objuser, function(err,res){
            if(err) throw err;
            else {
                console.log("1 user added");
                console.log(res);
            }
        });
    },
    updateOne : function(find_object_query, modified_order){
        pool.updateOne(find_object_query, {$set: modified_order}, function(err,res){
            if(err) throw err;
            else {
                console.log("Updated "+ JSON.stringify(find_object_query) + " with " + JSON.stringify(modified_order));
                console.log(res);
            }
        });
    },
    updateMany : function(find_object_query, modified_order){
        pool.updateMany(find_object_query, {$set: modified_order}, function(err,res){
            if(err) throw err;
            else {
                console.log("Updated many order contain "+ JSON.stringify(find_object_query) + " with " + JSON.stringify(modified_order));
                console.log(res);
            }
        });
    },
    find: function(find_object_query, transporter){
        pool.find(find_object_query, function(err,res){
            if(err) throw err;
            else {
                console.log("In ra ket qua "+JSON.stringify(res));
                transporter = res;
            }
        });  
    },
    findOne: function(find_object_query){
        pool.findOne(find_object_query, function(err,res){
            if(err) throw err;
            else {
                console.log("In ra ket qua "+JSON.stringify(res));
                //transporter = res.toObject();
            }
        });    
        
    },
    deleteOne: function(find_object_query){
        pool.deleteOne(find_object_query, function(err,res){
            if(err) throw err;
            else {
                console.log("Deleted "+ find_object_query);
                console.log(res);
            }
        });
    },
    
    deleteMany: function(find_object_query){
        pool.deleteMany(find_object_query, function(err,res){
            if(err) throw err;
            else {
                console.log("Deleted "+ find_object_query);
                console.log(res);
            }
        });
    },
    checklogin: function(formlogin){
        var ObjectID = require('mongodb').ObjectID;
        var o_id = new ObjectID(order_id);
        pool.findOne(formlogin, function(err,user){
            if(err) throw err;
            else {
                console.log(user);
            }
        });
        
        //var a = JSON.stringify(order);
        
    },
    text: "user said welcome to crud"
};
console.log("user said welcome to crud");

module.exports = user_api;