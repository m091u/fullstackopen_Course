import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },

    appendBlog(state, action) {
      state.push(action.payload);
    },

    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
    },
  },
});

export const { setBlogs, appendBlog, updateBlog } = blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    const sortedBlogs = blogs.sort((a, b) => a.title.localeCompare(b.title));
    dispatch(setBlogs(sortedBlogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
    return newBlog;
  };
};

export const updateLikes = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    });
    const updatedBlogWithUser = { ...updatedBlog, user: blog.user };
    dispatch(updateBlog(updatedBlogWithUser));
  };
};

export default blogsSlice.reducer;
