var mongo_handler = require('./../database/mongo_handler');
var BFO = mongo_handler.BF.order;
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
var BFAPI = BFO.order.add(objorder);

// file nay se duoc dung de gọi api xu ly order