import express from "express";
import { getTasks, addTask, updateTask } from "../controllers/taskController";

const router = express.Router();

router.get("/tasks", getTasks);
router.post("/tasks", addTask);
router.put("/tasks/:id", updateTask);

export default router;
