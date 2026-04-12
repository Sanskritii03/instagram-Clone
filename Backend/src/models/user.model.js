const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, "email already exists"],
    required: [true, "email required"],
        select:false

  },
  username: {
    type: String,
    unique: [true, "username already exists"],
    required: [true, "username is required"],
  },
  password: {
    type: String,
    required: [true, "password is require"],
    select:false
  },

  bio: String,

  profileImage: {
    type: String,
 default:"https://ik.imagekit.io/dlkl9kiwd/download.jpeg" },
});

const userModel = mongoose.model('users' , userSchema);


module.exports = userModel;