var express=require("express");
var router=express.Router();
var mongoose=require("mongoose");
var Hotel=require("../models/hotel");
var User=require("../models/user");
var Booking=require("../models/booking");
var moment=require("moment");
var middleware = require("../config/middleware.js");
moment().format('MMM Do YY');


router.get("/:id",function(req,res){
   Hotel.findById(req.params.id,function (err,foundHotel) {
       if(err){console.log(err)}
       else
     res.render("hotel/show",{hotel:foundHotel});
   });
});

router.get("/book/:id",middleware.isLoggedIn,function(req,res){
   Hotel.findById(req.params.id,function (err,foundHotel) {
       if(err){console.log(err)}
       else
    User.findById(req.user._id,function (err,foundUser) {
     
     res.render("booking/new",{Hotel:foundHotel,user:foundUser});
   });
})});

// router.post("/:id/booking",middleware.isLoggedIn,function(req, res){
//     User.findById(req.user.id, function(err, user){
//         console.log(Hotel.findById(req.params.id,function(err, foundhotel) {
//             return foundhotel;
//         }));
        
//     });
    
// });

router.post("/:id/booking",middleware.isLoggedIn,function(req, res){
  //lookup hotel using ID
  User.findById(req.user.id, function(err, user){
      if(err){
          console.log(err);
          res.redirect("/");
      } else {
          var query;
          Hotel.findById(req.params.id,function(err, foundHotel) {
          
          var hid={id:req.params.id,hotelname:foundHotel.name};
          var newBook={hotel:hid,fromdate:req.body.fromdate,todate:req.body.todate,room:req.body.room}
        Booking.create(newBook, function(err, booking){
          if(err){
              req.flash("error", "Something went wrong");
              console.log(err);
          } else {
              //add username and id to booking
                
                //   booking.hotel.hotelname = req.Hotel.name
              //save booking
              booking.save();
              user.bookings.push(booking);
              user.save();
              console.log(booking);
              req.flash("success", "Successfully added booking");
              res.redirect('/user/' + user._id);
          }
        });
         });}
  });
});



module.exports=router;