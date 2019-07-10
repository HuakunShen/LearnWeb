const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/db_association2', {useNewUrlParser: true});

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
});


const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});


const User = mongoose.model("User", userSchema);



const Post = mongoose.model("Post", postSchema);


// User.create({
//     email: "asr@mail.com",
//     name: "huakun shen"
// });

// Post.create({
//     title: "rfasfasdfasdfadfasfdfsde",
//     content: "agdsddddddddddddddfsdfawefa"
// }, (err, post) => {
//     User.findOne({name: "huakun shen"}, (err, foundUser) => {
//          if (err) {
//              console.log(err);
//          } else {
//              foundUser.posts.push(post);
//              foundUser.save((err, data) =>{
//                  if (err) {
//                      console.log(err);
//                  } else {
//                      console.log(data);
//
//                  }
//              })
//          }
//     });
// });

// 本来user里只存了post的object id，现在可以把用populate 将posts装满它本来的data，相当于transform成了embed user
// exec, execute 之后callback里得到的user就是attribute posts被populate之后的user object。cool！！！
User.findOne({name: "huakun shen"}).populate("posts").exec((err, user) => {
    if (err) {
        console.log(err);
    } else {
        console.log(user);
        user.posts.forEach((element) => {
            console.log(element);
        });
    }
});



// regular way of getting the posts
// find the user -> get the ids of posts from attribute posts -> find posts with the post ids
User.findOne({name: "huakun shen"}, (err, user) => {
    if (err) {
        console.log(err);
    } else {
        let posts = user.posts;
        posts.forEach((element) => {
            // element is the object id of the posts
            // now get the actual post with the ids found
            Post.findOne({_id: element}, (err, post) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(post);
                }
            })
        });
    }
});


