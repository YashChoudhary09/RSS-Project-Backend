const express = require("express");
const router = express.Router();
const taskRoute = require("../controllers/task.controller");
const varifyAdmin = require("../middlewares/varifyToken");

// create router for task---
router.post("/task",varifyAdmin.varifyToken,taskRoute.taskHandle);
router.get("/allTask",varifyAdmin.varifyToken,taskRoute.showAllTasks);
router.delete("/deleteTask/:id",varifyAdmin.varifyToken,taskRoute.deleteTask);
router.get("/findOneTask/:id",varifyAdmin.varifyToken,taskRoute.findOneTask);
router.put("/editTask/:id",varifyAdmin.varifyToken,taskRoute.editTask);


module.exports = router;