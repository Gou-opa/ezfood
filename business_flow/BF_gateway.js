var mongodb = require('./../database/mongo_handler');
var BFO = mongodb.BF.order;
var objorder = {
    dishname: "Lợn hấp lá chanh",
    quantity: 2,
    option: 
    {
        ingredient: "Không tỏi",
        cook: "Chín kỹ",
        decoration: ""
    }
};
var objlist = 
[
    {
        dishname: "Lợn nướng",
        quantity: 2,
        option: 
        {
            ingredient: "Không hành",
            cook: "Chín kỹ",
            decoration: ""
        }
    },
    {
        dishname: "Lợn giả cầy",
        quantity: 2,
        option: 
        {
            ingredient: "",
            cook: "Chín kỹ",
            decoration: ""
        }
    }
]

//BFO.count({quantity: 2});
//console.log(c2);
//BFO.insertMany(objlist);
//BFO.insertOne(objorder);
//BFO.updateOne({dishname: "Lợn luộc"},{dishname:"Thịt chó"});
//BFO.updateMany({dishname: "Lợn giả cầy"},{dishname:"Cháo trắng"});

//  async function doo(){
//      var a;
//      BFO.findOne({dishname:"Thịt chó"}, a);
//      console.log("a.dishname === "+a.dishname);
//  }

// doo();

// var Order = mongodb.schema;
// var findres = new Order({"dishname": "Thịt chó"});
// findres.findname(function(err, order){
//     if(err) throw err;
//     else console.log(order.dishname);
// });


//BFO.deleteOne({dishname: "Bò hầm"});
//BFO.deleteMany({dishname:"Lợn hấp lá chanh"});
BFO.paid("5babc7a12cefa02d082c7edc");
// file nay se duoc dung de gọi api xu ly order