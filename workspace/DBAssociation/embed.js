const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/db_association', {useNewUrlParser: true});

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
});


const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});


const User = mongoose.model("User", userSchema);



const Post = mongoose.model("Post", postSchema);

// let newUser = new User({
//     email: "huakun@mail.com",
//     name: "shen"
// });
// newUser.posts.push({
//     title: "trying ",
//     content: "trying hard"
// });
// newUser.save((err, user) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// let newPost = new Post({
//     title: "some random thing",
//     content: "content"
// });
// newPost.save((err, post) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });


User.findOne({name: "shen"}, (err, user) => {
    if (err) {
        console.log(err);
    }  else {
        user.posts.push({
            title: "random title222222222",
            content: "random content2222222222"
        });
        user.save((err, user) => {
            if (err) {
                console.log(err);
            }  else {
                console.log(user);
            }
        });
    }
});