var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require('./models/campground'),
    // User = require('./models/user'),
    Comment = require('./models/comment'),
    seedDB = require('./seeds'),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user")
;

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
// send current user to every route
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// seedDB();
app.use(express.static(__dirname + "/public"));
app.get("/", function (req, res) {
    res.render("landing");
});

// passport config
app.use(require("express-session")({
    secret: "secret encode code random",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser((User.deserializeUser()));





// INDEX Route - show all campground
app.get("/campgrounds", function (req, res) {
    // Retrieve all data from db
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
app.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new.ejs");
});

// SHOW
app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


// =====================================
// COMMENTS ROUTES
// =====================================

// create a new comment
// if not logged in /authenticated, not allowed to add comments
// basically run the middleware function "isLoggedIn" first, if logged in, "isLoggedIn" will direct to "next"
// which is the callback following
// only prevent user from seeing this page (form to comment), could use postman to send post request, have to prevent
// that
app.get('/campgrounds/:id/comments/new', isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground})
        }
    });
});

// post a comment
// if not logged in, even if a post request is sent (maybe not from the form from the route above), new comment
// is still prevented
app.post('/campgrounds/:id/comments', isLoggedIn, (req, res) => {
    // find campground

    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
        }
    });
});


// ===================
// Auth Routes
// ===================
app.get("/register", (req, res) => {
    res.render('register');
});

// handle sign up
app.post('/register', (req, res) => {
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
app.get("/login", (req, res) => {
    res.render("login");
});

// handle login
app.post('/login', passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) => {
    res.send("Login");
});


// logout route
app.get("/logout", (req, res) => {
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


app.listen(3000, function () {
    console.log("Yelpcamp server starts!!!");
});

