const express               = require("express"),
      app                   = express(),
      mongoose              = require("mongoose"),
      passport              = require("passport"),
      bodyParser            = require("body-parser"),
      LocalStrategy         = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      User                  = require("./models/user");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true}, (err)=> {
    if (err) {
        console.log(err);
    } else {
        console.log("db connected");
    }
});
app.use(require("express-session")({
    secret: "huakun shen",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// taking data from a session and serialize/deserialize it
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ==============
// ROUTES
// ==============


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/secret', isLoggedIn, (req, res) => {
    res.render("secret");
});


// auth routes
app.get('/register', (req, res) => {
     res.render('register');
});

app.post("/register", (req, res) => {
    User.register(new User({
        username: req.body.username
    }), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render('register');
        }
        // log user in
        passport.authenticate('local')(req, res, () => {
            res.redirect('/secret');
        })
    })
});


// login routes
app.get('/login', (req, res) => {
    res.render('login');
});


// middleware
app.post('/login', passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), (req, res) => {

});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
});

// middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}


app.listen(3000, () => {
    console.log("Server Running");
});