const mongoose = require("mongoose");

// creating image schema---
const imageSchema = new mongoose.Schema({
    url:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
    }
})

const Image = mongoose.model("Image",imageSchema);
module.exports = Image;