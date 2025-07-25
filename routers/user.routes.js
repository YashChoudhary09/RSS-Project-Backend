const express = require("express");
const router = express.Router();


const userControllers = require("../controllers/users.controller.js");


// user route
router.post("/register",userControllers.registerUser);
router.post("/login",userControllers.loginUser);



module.exports = router;