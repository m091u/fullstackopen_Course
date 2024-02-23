const User = require("../models/user");
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Test Blog Post 1",
    author: "Test Author 1",
    url: "https://test1.com",
    likes: 10,
  },
  {
    title: "Test Blog Post 2",
    author: "Test Author 2",
    url: "https://test2.com",
    likes: 1,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: "willremovethissoon" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
