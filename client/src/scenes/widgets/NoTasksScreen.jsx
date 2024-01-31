import React from "react";
import { Container, Typography } from "@mui/material";

const NoTasksScreen = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: "50px", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        It appears you don't have any to-dos yet.
      </Typography>
      <Typography variant="h4" gutterBottom>
        Use the "Add Task" button to create a to-do and keep track of your
        progress.
      </Typography>
    </Container>
  );
};

export default NoTasksScreen;
