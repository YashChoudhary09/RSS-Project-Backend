const mongoose = require("mongoose");

// task schema-----
const taskSchema = new mongoose.Schema({
    date:{
        type:Date,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    shakhaaName:{
        type:String,
        required:true,
    },
  
})

const Task = mongoose.model("Task",taskSchema);
module.exports = Task;