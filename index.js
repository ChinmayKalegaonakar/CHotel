var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    methodOverride = require("method-override"),
    passport=require("passport"),
    LocalStrategy = require("passport-local"),
    cookieParser=require("cookie-parser"),
    logger=require("morgan"),
    flash       = require("connect-flash");

    
var Hotel=require("./models/hotel");
var User=require("./models/user");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(flash());
// app.use(logger('combined'));


mongoose.connect("mongodb://localhost/CHotel");


app.use(require("express-session")({
    secret: "sessionSecretistopPriority",
    resave:false,
    saveUninitialized:true,
    cookie: { secure: false }
}));


app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

require("./config/passport.js")(passport);

var index_routes=require("./routes/index_route");
var hotel_routes=require("./routes/hotel_route");
var user_routes=require("./routes/user_route");

app.use("/",index_routes);
app.use("/hotel",hotel_routes);
app.use("/user",user_routes);


var port=process.env.PORT||3000;
var host=process.env.IP||"localhost";
app.listen(port,host,function(){
    console.log("server started");
})