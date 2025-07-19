const express = require("express");
const router = express.Router();
const adminInfo = require("../controllers/UpdateAdminSecret.controller.js");
const varifyToken = require("../middlewares/varifyToken.js");

// Creating adminPassword Router---
router.put("/adminInfoUpdate",varifyToken.varifyToken,adminInfo.updateAdminInfo);

module.exports = router;