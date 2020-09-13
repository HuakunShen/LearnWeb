var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("Welcome to app");
});

app.get("/speak/:animal", function(req, res) {
    var animal = req.params.animal.toLowerCase();
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof"
    }
    var sound = sounds[animal] == undefined ? "blah" : sounds[animal];
    res.send("The " + animal + " " + sound);
});

app.get("/repeat/:message/:times", function(req, res) {
    var message = req.params.message;
    var times = Number(req.params.times);
    var result = "";
    for (var i = 0; i < times; i++) {
        result += message + "\n";
    }
    res.send(result);
});

app.get("*", function(req, res) {
    res.send("page not found");
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started");
});
