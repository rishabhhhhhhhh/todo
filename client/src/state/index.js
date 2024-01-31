import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  tasks: [],
  task: null,
  filter: "All",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload.filter;
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload.tasks;
    },
    setTask: (state, action) => {
      state.task = action.payload.task;
    },
  },
});

export const { setLogin, setLogout, setTasks, setTask, setFilter } =
  authSlice.actions;

export default authSlice.reducer;
