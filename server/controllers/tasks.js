import Task from "../models/Task.js";
import User from "../models/User.js";

const isValidTitleOrDescription = (field) => {
  if (field === "" || field == null) {
    return false;
  }
  return true;
};

const isValidStatus = (status) => {
  if (status === "To Do" || status === "In Progress" || status === "Done") {
    return true;
  }
  return false;
};

export const createTask = async (req, res) => {
  try {
    const { userId, title, description, status } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    if (!isValidTitleOrDescription(title)) {
      return res.status(400).json({ msg: "Task title does not exist. " });
    }
    if (!isValidTitleOrDescription(description)) {
      return res.status(400).json({ msg: "Task description does not exist. " });
    }
    if (!isValidStatus(status)) {
      return res.status(400).json({ msg: "Task status does not exist. " });
    }

    const newTask = new Task({
      title,
      description,
      status,
      userId,
    });
    await newTask.save();

    const task = await Task.find({ userId }).sort({ createdAt: -1 });
    res.status(201).json(task);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { userId, title, description, status } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    if (!isValidTitleOrDescription(title)) {
      return res.status(400).json({ msg: "Task title does not exist. " });
    }
    if (!isValidTitleOrDescription(description)) {
      return res.status(400).json({ msg: "Task description does not exist. " });
    }
    if (!isValidStatus(status)) {
      return res.status(400).json({ msg: "Task status does not exist. " });
    }
    await Task.findOneAndUpdate(
      { _id: taskId },
      { userId, title, description, status }
    );
    const task = await Task.find({ userId }).sort({ createdAt: -1 });
    res.status(201).json(task);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAllTasksForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const task = await Task.find({ userId }).sort({ createdAt: -1 });
    res.status(201).json(task);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getTaskForUser = async (req, res) => {
  try {
    const { taskId, userId } = req.params;
    const task = await Task.find({ _id: taskId, userId });
    res.status(200).json(task);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

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
