const mongoose = require("mongoose");

// creating admin Schema---
const adminSchema = new mongoose.Schema({
    secret:{
        type:String,
        required:true,
    }
})

const Admin = mongoose.model("Admin",adminSchema);

module.exports = Admin;