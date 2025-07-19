const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
require("dotenv").config();

// implement cors---
const cors = require("cors");
app.use(cors());


// app read json data---
app.use(express.json());



//  connect to db --------
main().then(()=>console.log("db is connected successfully!")).catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

// access user routes------
const userRoutes = require("./routers/user.routes.js");
app.use("/",userRoutes);
// access shakhaa routes---
const shakhaaRoutes = require("./routers/shakhaaInfo.routes.js");
app.use("/",shakhaaRoutes);
// access task route-----
const taskRoutes = require("./routers/task.routes.js");
app.use("/",taskRoutes);
// access adminPassword route---
const adminInfoUpdate = require("./routers/adminPassword.routes.js");
app.use("/",adminInfoUpdate);




app.listen(port,()=>{console.log("app is listening to port-8080")});