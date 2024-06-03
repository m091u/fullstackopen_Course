import React, { useEffect } from "react";
import Blog from "./BlogDetails";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "../reducers/blogsReducer";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 4,
    paddingBottom: 4,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <h2>Blogs</h2>
      <div>
        {blogs.map((blog) => (
          <p style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </p>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
