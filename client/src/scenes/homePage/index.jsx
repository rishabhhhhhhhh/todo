import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import { useDispatch } from "react-redux";
import NoTasksScreen from "scenes/widgets/NoTasksScreen";
import { SERVER_URL } from "constants";
import { setTasks } from "state/index";
import { useEffect } from "react";
import TasksScreen from "scenes/widgets/TasksScreen";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const currentState = useSelector((state) => state);
  const dispatch = useDispatch();
  const { user, tasks, token } = currentState;

  const getUserTasks = async () => {
    const response = await fetch(`${SERVER_URL}/tasks/${user._id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch(setTasks({ tasks: data }));
  };

  useEffect(() => {
    getUserTasks();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Navbar showAddTaskButton={true} />
      <Box
        flexBasis={isNonMobileScreens ? "50%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
        {tasks.length === 0 ? <NoTasksScreen /> : <TasksScreen />}
      </Box>
    </Box>
  );
};

export default HomePage;
