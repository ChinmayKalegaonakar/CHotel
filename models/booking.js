var mongoose=require("mongoose");
var BookingSchema=new mongoose.Schema({
    hotel:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Hotel"
        },
        hotelname:String
    },
    fromdate:{type:Date, default: new Date()},
    todate:{type:Date, default: new Date()+1},
    room:Number,
});

module.exports=mongoose.model("Booking",BookingSchema);