const blogsRouter = require("express").Router();
const { request, response } = require("../app");
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const { error } = require("../utils/logger");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response)=> {
  const blog = await Blog.findById(request.params.id).populate("user", { username: 1, name: 1 });

  if (blog) {
    response.json(blog);
    console.log(blog);
  } else {
    response.status(404).end();
  }
})

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = request.user;

  if (!user || !user.id) {
    return response
      .status(401)
      .json({ error: "You are not authorized to create a blog" });
  }

  const currentUser = await User.findById(user.id);

  if (!currentUser) {
    return response.status(404).json({ error: "User not found" });
  }

  const blog = new Blog({
    ...request.body,
    user: currentUser,   
  });

    const savedBlog = await blog.save();

    await savedBlog.populate('user', { username: 1, name: 1 })

    currentUser.blogs = currentUser.blogs.concat(savedBlog._id);
    await currentUser.save();

  response.status(201).json(savedBlog);
});


blogsRouter.put("/:id", async (request, response, next) => {
  const { id } = request.params;
  const updatedBlogData = request.body;

  console.log(`Received PUT request for blog ID: ${id}`);
  console.log('Updated blog data:', updatedBlogData);

  const blog = await Blog.findById(id);
  if (!blog) {
    return response.status(404).json({ error: "Blog not found" });
  }
  blog.likes = updatedBlogData.likes;
  console.log(`Updating likes to: ${updatedBlogData.likes}`);
  const updatedBlog = await blog.save();
  await updatedBlog.populate("user", { username: 1, name: 1 });

  // const updatedBlog = await Blog.findByIdAndUpdate(id, updatedBlogData, { new: true }).populate("user", { username: 1, name: 1 });

  if (!updatedBlog) {
    return next(new Error("UpdateLikesError"));
  }
  console.log('Updated blog:', updatedBlog);
  
  response.json(updatedBlog);
});


blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response
      .status(401)
      .json({ error: "You are not authorized to delete this blog" });
  }

  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({
      error: "Blog not found",
    });
  }

  if (blog.user.toString() !== decodedToken.id.toString()) {
    return response
      .status(401)
      .json({ error: "You are not authorized to delete this blog" });
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
