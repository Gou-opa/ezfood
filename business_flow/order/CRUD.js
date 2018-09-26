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
    find: function(find_object_query){
        pool.find(find_object_query, function(err,res){
            if(err) throw err;
            else console.log(JSON.stringify(res));
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
    }
};
module.exports = order_api;