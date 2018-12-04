var pool = require('../../database/orderpool_schema');
//var url = mongodb.url;


//var neworder = new order(objorder);



var order_api = {
    count: function(query_filter){
        pool.count(query_filter, function(err,res){
            if(err) throw err;
            else console.log("counted "+ res);
        });
    },
    insertMany: function(objorderlist){
        pool.insertMany(objorderlist, function(err, res){
            if(err) throw err;
            else {
                console.log(objorderlist.length + " order added");
                console.log(res);
            }
        });
    },
    insertOne: function(objorder){
        pool.create(objorder, function(err,res){
            if(err) throw err;
            else {
                console.log("1 order added");
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
    paid: function(order_id){
        var ObjectID = require('mongodb').ObjectID;
        var o_id = new ObjectID(order_id);
        pool.findOne(o_id, function(err,order){
            if(err) throw err;
            else {
                var query = "INSERT INTO orders (createtime, sumprice,paid,customerid)values (NOW(), 10.5, 9.5, 524325)";
                console.log("day la query: "+query);
                var history_pool = require('../../database/mysql_BF_handler').history;
                history_pool.query(query, function(err, res){
                    if(err) {
                        console.log("Insert failed !");
                        throw err;
                    }
                    else console.log("Insert success");
                    console.log(res);
                });
            }
        });
        
        //var a = JSON.stringify(order);
        
    }
};
module.exports = order_api;