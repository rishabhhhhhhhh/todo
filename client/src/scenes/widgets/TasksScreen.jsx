import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { SERVER_URL } from "constants";
import { useDispatch } from "react-redux";
import { setTasks } from "state";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const trimTheValue = (value, maxLength) => {
  if (value === null || value === undefined) {
    return "";
  }
  if (value.length > maxLength) {
    return value.substring(0, maxLength) + "...";
  }
  return value;
};

const TasksScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filterStatus = useSelector((state) => state.filter);
  const tasks = useSelector((state) => state.tasks) || []; // eslint-disable-line react-hooks/exhaustive-deps
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const userId = user._id;

  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const getStatusBackground = (status) => {
    if (status === "In Progress") {
      return {
        background: "#FFC300",
      };
    } else if (status === "To Do") {
      return {
        background: "#B45935",
      };
    }
    return {
      background: "#008A24",
    };
  };

  const handleEdit = (index) => {
    navigate("/task/" + filteredTasks[index]._id);
  };

  const handleDelete = async (index) => {
    const taskIdToBeDeleted = filteredTasks[index]._id;

    await fetch(`${SERVER_URL}/tasks/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ taskId: taskIdToBeDeleted, userId }),
    });

    setFilteredTasks(
      filteredTasks.filter((task) => task._id !== taskIdToBeDeleted)
    );

    dispatch(
      setTasks({
        tasks: tasks.filter((task) => task._id !== taskIdToBeDeleted),
      })
    );
  };

  useEffect(
    () =>
      setFilteredTasks(
        filterStatus === "All"
          ? tasks
          : tasks.filter((task) => task.status === filterStatus)
      ),
    [filterStatus, tasks]
  ); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="all-task">
      {filteredTasks.map((details, index) => (
        <div key={index} className="task-card">
          <div className="task-heading">
            <div className="task-title">{trimTheValue(details.title, 20)}</div>
            <div className="task-details">
              <span
                className="task-status"
                style={getStatusBackground(details.status)}
              >
                {details.status}
              </span>
              <EditIcon
                onClick={() => handleEdit(index)}
                className="task-edit-icon"
              />
              <DeleteIcon
                onClick={() => handleDelete(index)}
                className="task-delete-icon"
              />
            </div>
          </div>
          <div className="task-description">
            {trimTheValue(details.description, 200)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TasksScreen;
