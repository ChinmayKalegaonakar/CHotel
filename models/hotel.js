var mongoose=require("mongoose");
var HotelSchema=new mongoose.Schema({
    name:String,
    address:String,
    price: Number,
    rating: Number,
    rooms: Number,
    img: String
},{collection:"Hotel"});

module.exports=mongoose.model("Hotel ",HotelSchema);