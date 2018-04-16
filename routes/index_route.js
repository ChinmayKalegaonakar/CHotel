var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Hotel = require("../models/hotel");
var User = require("../models/user");
var passport = require("passport");

router.get("/", function(req, res) {
    Hotel.find({}, function(err, foundHotel) {
        if (err) { console.log(err) }
        else
            res.render("index", { Hotels: foundHotel });
    })

});

router.get("/signup", function(req, res) {
    res.render("user/signup");

});
router.post("/register", passport.authenticate("local-signup", {
    successRedirect: "/",
    faliureRedirect: "/user/signup",
    faliureFlash: true

}));

router.get("/login", function(req, res) {
    res.render("user/login");

});
router.post("/login", passport.authenticate("local-login", {
    successRedirect: "/",
    faliureRedirect: "/user/login",
    faliureFlash: true

}));


router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

  // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    router.get('/auth/google', passport.authenticate('google', { scope : ['email'] }));

    // the callback after google has authenticated the user
    router.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/',
                    failureRedirect : '/login'
            }));




module.exports = router;