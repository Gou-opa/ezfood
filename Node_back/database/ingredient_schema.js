var mongoose = require('mongoose');
var ingredientSchema = new mongoose.Schema({
    type: Number, 
    name: String,
    price: Number,
    quantity: Number,
    expire: {type: Date},
    received_date: {type:Date, default:Date.now}
});
var ingredient = mongoose.model("ingredient", ingredientSchema);
module.exports = ingredient;