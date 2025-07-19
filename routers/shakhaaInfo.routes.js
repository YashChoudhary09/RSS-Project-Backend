const express = require("express");
const router = express.Router();
const shakhaacontroller = require("../controllers/shakhaaInfo.controller.js");
const varifyAdmin = require("../middlewares/varifyToken.js");

// shakhhaa Router -----
router.post("/shakhaaInfo",varifyAdmin.varifyToken,shakhaacontroller.saveShakhaaInfo);
router.get("/allShakhaaInfo",varifyAdmin.varifyToken,shakhaacontroller.allShakhaaInfo);
router.delete("/deleteShakhaa/:id",varifyAdmin.varifyToken,shakhaacontroller.deleteShakhaa)
router.post("/saveShakhaaImage",varifyAdmin.varifyToken,shakhaacontroller.saveShakhaaImages);
router.get("/allshakhaaImages",varifyAdmin.varifyToken,shakhaacontroller.allShakhaaImages);
router.delete("/deleteShakhaa/images/:id",varifyAdmin.varifyToken,shakhaacontroller.deleteShakhaaImage)
router.put("/updateShakhaa/:id",varifyAdmin.varifyToken,shakhaacontroller.editShakhaa)
router.get("/findOneShakhaa/:id",varifyAdmin.varifyToken,shakhaacontroller.findOneShakhaa);


module.exports = router;