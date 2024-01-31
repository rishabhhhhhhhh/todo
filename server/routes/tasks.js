import express from "express";
import {
  getAllTasksForUser,
  getTaskForUser,
  createTask,
  updateTask,
  deleteUserTask,
} from "../controllers/tasks.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:userId", verifyToken, getAllTasksForUser);
router.get("/:taskId/user/:userId", verifyToken, getTaskForUser);

/* POST */
router.post("/", verifyToken, createTask);

/* PUT */
router.put("/update/:taskId", verifyToken, updateTask);

/* DELETE */
router.delete("/delete", verifyToken, deleteUserTask);

export default router;
