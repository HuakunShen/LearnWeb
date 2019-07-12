const express = require("express"), 
app = express(),
methodOverride = require("method-override"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
expressSanitizer = require("express-sanitizer");

mongoose.connect("mongodb://localhost:27017/blog_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
// app.use('/public', express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

//Mongoose models config
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Motor",
//     image: "https://images.unsplash.com/photo-1558981420-bf351ce8e3ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
//     body: "Hello Motor"
// });



// RESTful Routes
app.get("/", function(req, res){
    res.redirect("/blogs");
});

// Index Route
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("Error!");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

//New Route
app.get("/blogs/new", function(req, res){
    res.render("new");
});

// Create Route
app.post("/blogs", function(req, res){
    // create blog
    req.body.blog.body  = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

//Show Route
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    })
});

// Edit Route
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

// Update Route
app.put("/blogs/:id", function(req, res){
    req.body.blog.body  = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
});

//Destroy Route
app.delete("/blogs/:id", function(req, res){
    // destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    })
    // redirect 
});








app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is Running");
});