const express =require("express");
const Task = require("../model/taskModel")
const router = express.Router();
const { createTask, getTasks, getTask, deleteTask, updateTask, } = require("./controllers/taskController");

router.route("/").get(getTasks).post(createTask);
router.route("/").get(getTask).delete(deleteTask).put(updateTask);

router.post("/", createTask);
//router.get("/", getTasks);
router.get("/tasks", getTasks);

router.get("/", getTask);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);
 

module.exports = router;