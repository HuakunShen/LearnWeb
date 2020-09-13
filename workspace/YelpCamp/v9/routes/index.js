const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

router.get("/", function (req, res) {
    res.render("landing");
});

// ===================
// Auth Routes
// ===================
router.get("/register", (req, res) => {
    res.render('register');
});

// handle sign up
router.post('/register', (req, res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/campgrounds");
            })
        }
    })
});


// show login form
router.get("/login", (req, res) => {
    res.render("login");
});

// handle login
router.post('/login', passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) => {
    res.send("Login");
});


// logout route
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
});

// middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}

module.exports = router;