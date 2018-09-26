var mongo = require('../database/mongo_handler');
var objorder = {
    dishname: "Lợn lu",
    quantity: 2,
    option: 
    {
        ingredient: "Không tỏi",
        cook: "Chín kỹ",
        decoration: ""
    }
};
mongo.BF.order.add(objorder);

// file nay se duoc dung de gọi api xu ly order