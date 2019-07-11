var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require('./models/campground');

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema Setup

// Campground.create(
//     {
//         name: "sgthnbesarbh",
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTpwFVzgRwjYNhkvcCkfLEdpPFc0Kmanewk1NgHWrBJlBuTv-c",
//         description: "arhgaa rtgarg ar aregta"
//     }, function(err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("create new campground");
//             console.log(campground);
//         }
//     });


app.get("/", function (req, res) {
    res.render("landing");
});

// INDEX Route - show all campground
app.get("/campgrounds", function (req, res) {
    // Retrieve all data from db
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds, campgrounds});
        }
    });
});

// CREATE Route - add new campground
app.post("/campgrounds", function (req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    // Save new to db
    Campground.create(newCampground, function(err, newCreated) {
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
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs"); 
});

// SHOW
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});        
        }
    });
    
});


app.listen(3000, function () {
    console.log("Yelpcamp server starts!!!");
});