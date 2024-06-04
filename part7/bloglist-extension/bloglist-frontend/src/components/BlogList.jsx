import React, { useEffect } from "react";
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
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 4,
    border: "solid",
    borderWidth: 2,
    marginBottom: 3,
  };

  return (
    <div>
      <h2>Blogs</h2>
      <div>
        {blogs.map((blog) => (
          <p key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </p>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
