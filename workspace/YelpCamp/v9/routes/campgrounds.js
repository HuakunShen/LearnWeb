const express = require("express");
const router = express.Router();
const Campground = require("../models/campground"),
      Comment    = require("../models/comment");

// INDEX Route - show all campground
router.get("/", function (req, res) {
    // Retrieve all data from db
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});

// CREATE Route - add new campground
router.post("/", isLoggedIn, function (req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    // Save new to db
    Campground.create(newCampground, function (err, newCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
    // redirect to campground page
    // res.redirect("/campgrounds");/**/

});

// NEW - Show form to create new campground
router.get("/new", isLoggedIn, function (req, res) {
    res.render("campgrounds/new.ejs");
});

// SHOW
router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}

module.exports = router;