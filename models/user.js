var mongoose=require("mongoose");
var bcrypt=require("bcrypt-nodejs");

var UserSchema=new mongoose.Schema({
 local:{   
     email:String,
     password:String
 },
 google  : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    name:{type: String,default:"Specify name"},
    img:{type: String,default:"https://vistana-web-static.s3.amazonaws.com/vistana-web/assets/img/profile/profile-pic-medium.png?1522712722"},
    bookings:[
        {
        type: mongoose.Schema.Types.ObjectId,
         ref: "Booking"
        }]
 
},{collection:"User"});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app

module.exports=mongoose.model("User",UserSchema);