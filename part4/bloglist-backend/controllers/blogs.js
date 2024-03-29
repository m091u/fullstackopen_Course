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

blogsRouter.put("/:id", async (request, response) => {
  const { title, likes, author, url } = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, likes, author, url },
    { new: true }
  );

  response.json(updatedBlog);
});

//increase likes
blogsRouter.put("/:id", async (request, response) => {
  const { id } = req.params;
  const updatedBlogData = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(id, updatedBlogData, {
    new: true,
  });

  if (!updatedBlog) {
    return next(new Error("UpdateLikesError"));
  }

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
