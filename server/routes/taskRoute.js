import express from "express";
const router = express.Router();
import { createTask, getTasks, getTask, deleteTask, updateTask, } from '../controllers/taskController.js';

router.route("/").get(getTasks).post(createTask);
router.route("/").get(getTask).delete(deleteTask).put(updateTask);

router.post("/", createTask);
router.get("/tasks", getTasks);

router.get("/", getTask);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);
 

export default router;