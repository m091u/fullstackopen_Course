import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateLikes } from "../reducers/blogsReducer";
import { setBlog } from "../reducers/blogReducer";
import blogService from "../services/blogs";

const BlogDetails = ({ loggedInUser, handleDelete }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blog = useSelector(state => state.blog);
  const blogs = useSelector(state => state.blogs);
  useEffect(() => {
    console.log('Current blog state:', blog);
    console.log('All blogs state:', blogs);
  }, [blog, blogs]);

  useEffect(() => {
    const fetchBlog = async () => {
      const blogDetails = await blogService.getBlogById(id);
      console.log('Fetched blog details:', blogDetails);
      dispatch(setBlog(blogDetails))
    };
    fetchBlog();
  },[id, dispatch]);

  const handleLike = () => {
    console.log('Liking blog:', blog);
    dispatch(updateLikes(blog));
  };

  useEffect(() => {
    console.log('Updated blog:', blog);
  }, [blog]);

  if (!blog) {
    return null;
  }


  return (
    <div className="blog">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <p>{blog.url}</p>

      <p>
        Likes: {blog.likes} <button onClick={handleLike}>like</button>
      </p>

      {blog.user && (
        <p>
          Added by: {blog.user.name} 
        </p>
      )}

      {blog.user && loggedInUser.username === blog.user.name && (
        <button
          onClick={() => handleDelete(blog.id, blog.title, blog.author)}
          style={{ backgroundColor: "blue", color: "white" }}
        >
          Remove
        </button>
      )}

      <h3>Comments</h3>

      <form >
        <input
     
          placeholder='write comment here'
          id='comment-input'
        />
        <button type="submit">add comment</button>
      </form>
    </div>
  );
};

export default BlogDetails;
