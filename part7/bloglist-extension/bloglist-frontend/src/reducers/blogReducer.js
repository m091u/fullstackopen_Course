import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: { blog: null },
  reducers: {
    setBlog(state, action) {
        return action.payload;
      },
  },
});

export const { setBlog } = blogSlice.actions;


export default blogSlice.reducer;