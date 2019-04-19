var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("root page get");
});

app.post("/", function(req, res) {
    res.send("root page post");
});

app.get("/sub", function(req, res) {
    res.send("sub page get");
});

var server = app.listen(3000, function() {
    console.log("server starts");
});