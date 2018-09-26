var pool = require('../../database/orderpool_schema');

//var url = mongodb.url;


//var neworder = new order(objorder);



var order_api = {
    add: function(objorder){
        pool.create(objorder, function(err){
            if(err) throw err;
            else console.log("1 order required");
        });
        // mongodb.connect(url,function(err,db) {
        //     if (err) throw err;
        //     var dbo = db.db("ezfood");
        //     //dbo.createCollection("orderpool");
        //     dbo.collection("orderpool").insertOne(order, function(err, res) {
        //       if (err) throw err;
        //       console.log("1 order required");
        //       db.close();
        //     });
        // });
    },
    modify : function(find_object_query, modified_order){
        mongodb.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("ezfood");
            dbo.collection("orderpool").updateOne(find_object_query, modified_order, function(err, res) {
                if (err) throw err;
                console.log("1 order updated");
                db.close();
            });
        });
    },
    delete: function(find_object_query){
        mongodb.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("ezfood");
            dbo.collection("orderpool").deleteOne(find_object_query, function(err, res) {
                if (err) throw err;
                console.log("1 order deleted");
                db.close();
            });
        });
    }
};
module.exports = order_api;