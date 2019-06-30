var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// add cat
var huakun = new Cat({
    name: "Huakun",
    age: 19,
    temperament: "cold"
});



// huakun.save(function(err, cat) {
//     if (err) {
//         console.log("something went wrong");
//     } else {
//         console.log("Just saved a cat to DB");
//         console.log(cat);
//     }
// });

Cat.create({
    name: "Sanda",
    age: 9,
    temperament: "nice"
}, function(err, cat) {
    if (err) {
        console.log("Error find");
        console.log(err);
    } else {
        console.log("find success");
        console.log(cat);
    }
});
// retrieve cats from DB
Cat.find({}, function(err, cats) {
    if (err) {
        console.log("Error find");
        console.log(err);
    } else {
        console.log("find success");
        console.log(cats);
    }
})