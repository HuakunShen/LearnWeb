var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {
        name: "iron man",
        image: "https://d13ezvd6yrslxm.cloudfront.net/wp/wp-content/images/ironman-spiderman-homecoming-poster-frontpage-700x354.jpg"
    },
    {
        name: "captain america",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7ckQp29L9xZNp0PILRCnX4EFgVkUeRBauEmMm8acoge40qOLo"
    },
    {
        name: "spider man",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9d6JbI7AlYFLlew8-sScnxEzmnNyflajI1ZPeeILxVZocvk6Heg"
    }
];

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {

    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function (req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    // redirect to campground page
    res.redirect("/campgrounds");

});

app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs");
});


app.listen(3000, function () {
    console.log("Yelpcamp server starts!!!");
});