import { useState, useEffect, useRef } from "react";
import "./App.css";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationWithDuration } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog } from "./reducers/blogsReducer";
import { login, logout } from "./reducers/userReducer";
import { selectUser } from "./reducers/userReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector(selectUser);
  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      console.log(user);

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      // setUser(user);
      dispatch(login(user));
      console.log(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotificationWithDuration("Wrong username or password", 5));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(logout());
  };

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      blogObject.user = user;

      const returnedBlog = await dispatch(createBlog(blogObject));
      dispatch(
        setNotificationWithDuration(
          `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
          5
        )
      );
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(setNotificationWithDuration(error.response.data.error, 5));
      } else {
        dispatch(
          setNotificationWithDuration("An unexpected error occurred", 5)
        );
      }
    }
  };

  const handleDelete = async (id, title, author) => {
    const confirmation = window.confirm(
      `Are you sure you want to delete "${title}" by ${author}?`
    );
    if (confirmation) {
      try {
        await blogService.remove(id);
        dispatch(initializeBlogs());
        dispatch(setNotificationWithDuration("Blog deleted successfully", 5));
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <>
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <Notification />

          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                type="text"
                data-testid="username"
                id="username"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                type="text"
                id="password"
                data-testid="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit" id="login-button">
              Login
            </button>
          </form>
        </div>
      ) : (
        <div>
          <Notification />
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
  );
};

export default App;
