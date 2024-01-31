import { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Button,
  InputLabel,
} from "@mui/material";
import { Menu, Close, Add } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "scenes/widgets/FlexBetween";

const Navbar = ({ showAddTaskButton = false }) => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const filterVal = useSelector((state) => state.filter);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  const handleViewTaskStatus = (event) => {
    dispatch(setFilter({ filter: event.target.value }));
  };

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween>
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            marginRight: "10px",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          Taskky
        </Typography>
        {showAddTaskButton ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => navigate("/task/new")}
          >
            Add Task
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/home")}
          >
            Go back to Home
          </Button>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <div className="select-navbar">
          <FormControl>
            <InputLabel id="selectOptions-label">Tasks View Filter</InputLabel>
            <Select
              value={filterVal}
              label="Select an option"
              onChange={handleViewTaskStatus}
              sx={{
                backgroundColor: neutralLight,
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="selectOptions-label">Info</InputLabel>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
            >
              <MenuItem value={fullName}>{fullName}</MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </div>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <div className="select-navbar">
            <FormControl>
              <InputLabel id="selectOptions-label">
                Tasks View Filter
              </InputLabel>
              <Select
                value={filterVal}
                label="Select an option"
                onChange={handleViewTaskStatus}
                sx={{
                  backgroundColor: neutralLight,
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="To Do">To Do</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="selectOptions-label">Info</InputLabel>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
              >
                <MenuItem value={fullName}>{fullName}</MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
