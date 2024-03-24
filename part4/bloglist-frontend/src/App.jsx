import { useState, useEffect, useRef } from 'react'
import './App.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Error'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    // blogService.getAll().then((blogs) => setBlogs(blogs));
    const fetchBlogs = async () => {
      const fetchedBlogs = await blogService.getAll()
      const sortedBlogs = fetchedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }
    fetchBlogs()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      console.log(user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      blogObject.user = user;

      const returnedBlog = await blogService.create(blogObject)
      console.log('the created blog is', returnedBlog);
      setBlogs([...blogs, returnedBlog])
      setErrorMessage(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error)
      } else {
        setErrorMessage('An unexpected error occurred')
      }
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (id, title, author) => {
    const confirmation = window.confirm(
      `Are you sure you want to delete "${title}" by ${author}?`
    )
    if (confirmation) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter((blog) => blog.id !== id))
        setErrorMessage('Blog deleted successfully')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      } catch (error) {
        console.error('Error deleting blog:', error)
      }
    }
  }

  return (
    <>
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <Notification message={errorMessage} />

          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                type="text"
                data-testid='username'
                id='username'
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                type="text"
                id='password'
                data-testid='password'
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit" id="login-button">Login</button>
          </form>
        </div>
      ) : (
        <div>
          <Notification message={errorMessage} />
          <h2>Blogs</h2>
          <p>{user.name} is logged-in</p>
          <button onClick={handleLogout}>Logout</button>
          <hr />
          <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <hr />
          <div>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                loggedInUser={user}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default App
