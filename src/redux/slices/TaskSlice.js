import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  categories: [],
  status: "",
  id: null
};

const taskSlice = createSlice({
  name: "Task",
  initialState,
  reducers: {
    handleGetAllTask: (state, action) => {
      state.data = action.payload;
    },
    handleChangeStatus: (state, action) => {
      state.status = action.payload
    },
    handleChangeId: (state, action) => {
      state.id = action.payload
    },
    handleGetAllCategory: (state, action) => {
      state.categories = action.payload
    }
  },
});

export const {handleGetAllTask, handleChangeStatus, handleChangeId, handleGetAllCategory} = taskSlice.actions
export default taskSlice.reducer
