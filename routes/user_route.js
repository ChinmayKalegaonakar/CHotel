var express=require("express");
var router=express.Router();
var mongoose=require("mongoose");
var User=require("../models/user");
var Booking=require("../models/booking");
var moment=require("moment");
var middleware = require("../config/middleware.js");
moment().format('MMM Do YY');

router.get("/:id",function(req,res){
   User.findById(req.params.id).populate("bookings").exec(function (err,foundUser) {
       if(err){console.log(err)}
       else
     res.render("user/show",{User:foundUser,moment:moment});
   });
});


router.get("/:id/edit", function(req, res){
    User.findById(req.params.id, function(err, foundCampground){
        res.render("user/edit", {user: foundCampground});
    });
});


router.put("/:id", function(req, res){
    // find and update the correct campground
   User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedCampground){
       if(err){
           res.redirect("/");
       } else {
           //redirect somewhere(show page)
           res.redirect("/user/" + req.params.id);
       }
    });
});


module.exports=router;