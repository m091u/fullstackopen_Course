import { useState, useEffect } from 'react'
import axios from 'axios'

const Blog = ({ blog, loggedInUser, handleDelete }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  console.log('Received blog:', blog);

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const handleLike = async () => {
    try {
      const updatedBlog = { ...blog, likes: likes + 1 }
      await axios.put(`/api/blogs/${blog.id}`, updatedBlog)
      setLikes(likes + 1)
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 4,
    paddingBottom: 4,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <>
      <div style={blogStyle} className='blog'>
        {blog.title} <br />Author: {blog.author}
        <button style={{ marginLeft: 5 }} onClick={toggleVisibility}>
          {detailsVisible ? 'hide' : 'view'}
        </button>
        {detailsVisible && (
          <div>
            <p>{blog.url}</p>
            <p>
              Likes: {likes} <button onClick={handleLike}>like</button>
            </p>
            <p>User Name: {blog.user[0].name}</p>
            {loggedInUser.username === blog.user[0].username && (
              <button
                onClick={() => handleDelete(blog.id, blog.title, blog.author)}
                style={{ backgroundColor: 'blue', color: 'white' }}
              >
              Remove
              </button>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Blog
