const mongoose              = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});
// add functions / utilities to UserSchema for auth
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);