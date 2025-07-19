const mongoose = require("mongoose");

// shakhaaInfo schema ---
const shakhaaInfoSchema = new mongoose.Schema({
   jila:{
     type:String,
   },
   nagar:{
      type:String,
   },
   basti:{
      type:String,
   },
   shakhaaName:{
    type:String,
   },
   adminName:{
    type:String,
   },
   contactNumber:{
    type:Number,
   },
   address:{
      type:String,
   },
   role:{
      type:String,
   },
})

const Shakhaa = mongoose.model("Shakhaa",shakhaaInfoSchema);

module.exports = Shakhaa;