import Task from "../models/Task.js";
import User from "../models/User.js";

const ALL_TASKS = "ALL";

const isValidField = (field) => {
  if (field === "" || field == null) {
    return false;
  }
  return true;
};

/* CREATE TASK */
export const createTask = async (req, res) => {
  try {
    const { userId, title, description, status, priority } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    if (!isValidField(title)) {
      return res.status(400).json({ msg: "Task title does not exist. " });
    }
    if (!isValidField(description)) {
      return res.status(400).json({ msg: "Task description does not exist. " });
    }
    if (!isValidField(status)) {
      return res.status(400).json({ msg: "Task status does not exist. " });
    }
    if (!isValidField(priority)) {
      return res.status(400).json({ msg: "Task priority does not exist. " });
    }

    const newTask = new Task({
      title,
      description,
      status,
      priority,
      userId,
    });
    await newTask.save();

    const task = await Task.find().sort({ createdAt: -1 });
    res.status(201).json(task);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/*
    Get all tasks for user
 */
export const getUserTasks = async (req, res) => {
  try {
    const { userId, status } = req.params;
    let query = { userId };

    if (status && status != ALL_TASKS) {
      query.status = status;
    }
    const task = await Task.find(query).sort({ createdAt: -1 });
    res.status(200).json(task);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/*
    Delete task for user by id
 */
export const deleteUserTask = async (req, res) => {
  try {
    const { userId, taskId } = req.body;

    Task.deleteOne({ userId, _id: taskId })
      .then(function () {
        res.status(200).json({ message: "Task deleted" });
      })
      .catch(function (error) {
        res.status(200).json({ message: error.message });
      });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
