import React from "react";
import { useState } from 'react'
import { useDispatch } from "react-redux";
import { updateLikes } from "../reducers/blogsReducer";

const Blog = ({ blog, loggedInUser, handleDelete }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const dispatch = useDispatch();

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible);
  };

  const handleLike = () => {
    dispatch(updateLikes(blog));
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 4,
    paddingBottom: 4,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <>
      <div style={blogStyle} className="blog">
        {blog.title} <br />
        Author: {blog.author}
        <button style={{ marginLeft: 5 }} onClick={toggleVisibility}>
          {detailsVisible ? "hide" : "view"}
        </button>
        {detailsVisible && (
          <div>
            <p>{blog.url}</p>
            <p>
              Likes: {blog.likes} <button onClick={handleLike}>like</button>
            </p>
            <p>User Name: {blog.user[0].name}</p>
            {loggedInUser.username === blog.user[0].username && (
              <button
                onClick={() => handleDelete(blog.id, blog.title, blog.author)}
                style={{ backgroundColor: "blue", color: "white" }}
              >
                Remove
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;
