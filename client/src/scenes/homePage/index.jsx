import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import { useDispatch } from "react-redux";
import NoTasksScreen from "scenes/widgets/NoTasksScreen";
import { SERVER_URL } from "constants";
import { setTasks } from "state/index";
import { useEffect, useState } from "react";
import TasksScreen from "scenes/widgets/TasksScreen";
import Spinner from "scenes/widgets/Spinner";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const currentState = useSelector((state) => state);
  const dispatch = useDispatch();
  const { user, tasks, token } = currentState;
  const [isLoading, setIsLoading] = useState(false);

  const getUserTasks = async () => {
    const response = await fetch(`${SERVER_URL}/tasks/${user._id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch(setTasks({ tasks: data }));
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getUserTasks();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return <Spinner />;
  }

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
