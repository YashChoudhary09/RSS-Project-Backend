const mongoose = require("mongoose");

// user schema -----
const userSchema = new mongoose.Schema({
  name : {
    type:String,
  },
  emailId:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  role:{
    type:String,
    enum:["admin","user"],
    required:true,
  },
  regSecret:{
    type:String,
    required:true,
  }
});

const User = mongoose.model("User",userSchema);

module.exports = User;


