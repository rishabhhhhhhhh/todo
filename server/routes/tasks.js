import express from "express";
import {
  getUserTasks,
  createTask,
  deleteUserTask,
} from "../controllers/tasks.js";

const router = express.Router();

/* READ */
router.get("/:userId/:status", getUserTasks); //get all tasks for user

/* POST */
router.post("/", createTask);

/* DELETE */
router.delete("/delete", deleteUserTask);

export default router;
