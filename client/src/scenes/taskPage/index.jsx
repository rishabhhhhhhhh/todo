import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { setTask, setTasks } from "state";
import { SERVER_URL, STATUS } from "constants";
import { useEffect } from "react";
import Navbar from "scenes/navbar";
import Spinner from "scenes/widgets/Spinner";

const taskSchema = yup.object().shape({
  title: yup.string().required("required"),
  description: yup.string().required("required"),
  status: yup.string().required("required"),
});

const NEW_TASK_ID = "new";

const TaskForm = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const [isLoading, setIsLoading] = useState(false);

  const { palette } = useTheme();
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const saveUserResponse = async (values) => {
    let result;
    if (taskId === NEW_TASK_ID) {
      result = await fetch(`${SERVER_URL}/tasks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
    } else {
      result = await fetch(`${SERVER_URL}/tasks/update/${taskId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
    }
    const savedUser = await result.json();
    console.log("JSON = " + JSON.stringify(savedUser));
    return savedUser;
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    values["userId"] = user._id;
    saveUserResponse(values);
    onSubmitProps.resetForm();

    navigate("/home");
  };

  const getTask = async () => {
    const response = await fetch(
      `${SERVER_URL}/tasks/${taskId}/user/${user._id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    const currentTask = data[0];

    setStatus(currentTask.status || "");
    setDescription(currentTask.description || "");
    setTitle(currentTask.title || "");

    dispatch(setTask({ task: currentTask }));
    setIsLoading(false);
  };

  useEffect(() => {
    if (taskId !== NEW_TASK_ID) {
      setIsLoading(true);
      getTask();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return <Spinner />;
  }

  const taskInitialValues = {
    status: status,
    title: title,
    description: description,
  };

  return (
    <Box>
      <Navbar />
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={taskInitialValues}
          validationSchema={taskSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobileScreens ? undefined : "span 4",
                  },
                }}
              >
                <div>Title</div>
                <TextField
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  name="title"
                  error={Boolean(touched.title) && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  sx={{ gridColumn: "span 4" }}
                />
                <div>Description</div>
                <TextField
                  multiline
                  rows={4}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  error={
                    Boolean(touched.description) && Boolean(errors.description)
                  }
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "span 4" }}
                />
                <div>Status</div>
                <Select
                  value={values.status}
                  name="status"
                  onChange={(selectedOption) =>
                    handleChange("status")(selectedOption)
                  }
                  sx={{ gridColumn: "span 4" }}
                >
                  <MenuItem value={STATUS[0].value}>{STATUS[0].label}</MenuItem>
                  <MenuItem value={STATUS[1].value}>{STATUS[1].label}</MenuItem>
                  <MenuItem value={STATUS[2].value}>{STATUS[2].label}</MenuItem>
                </Select>
              </Box>

              {/* BUTTONS */}
              <Box>
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    m: "2rem 0",
                    p: "1rem",
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                >
                  {taskId === NEW_TASK_ID ? "Create Task" : "Update Task"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default TaskForm;
