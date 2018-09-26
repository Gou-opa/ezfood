var mongo_handler = require('./../database/mongo_handler');
var BF = mongo_handler.BF;
var objorder = {
    dishname: "Lợn quay",
    quantity: 2,
    option: 
    {
        ingredient: "Không tỏi",
        cook: "Chín kỹ",
        decoration: ""
    }
};
var BFAPI = BF.order.add(objorder);

// file nay se duoc dung de gọi api xu ly order