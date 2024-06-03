import React from "react";
import { useDispatch } from "react-redux";
import { updateLikes } from "../reducers/blogsReducer";

const BlogDetails = ({ blog, loggedInUser, handleDelete }) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(updateLikes(blog));
  };

  if (!blog) {
    return null
  }

  return (
    <div className="blog">
      <h1>Test</h1>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <p>{blog.url}</p>

      <p>
        Likes: {blog.likes} <button onClick={handleLike}>like</button>
      </p>

      <p>Added by: {blog.user[0].name}</p>

      { loggedInUser.username === blog.user[0].username && (
        <button
          onClick={() => handleDelete(blog.id, blog.title, blog.author)}
          style={{ backgroundColor: "blue", color: "white" }}
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default BlogDetails;
