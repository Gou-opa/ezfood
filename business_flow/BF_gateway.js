var mongo_handler = require('./../database/mongo_handler');
var BFO = mongo_handler.BF.order;
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

//BFO.find({dishname:"Cháo gà"});
BFO.deleteOne({dishname: "Bò hầm"});
BFO.deleteMany({dishname:"Lợn hấp lá chanh"});
// file nay se duoc dung de gọi api xu ly order