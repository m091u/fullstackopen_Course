const blogsRouter = require("express").Router();
const { request, response } = require("../app");
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  // blog
  //   .save()
  //   .then((result) => {
  //     response.status(201).json(result);
  //   })
  //   .catch((error) => next(error));

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (request, response) => {
  const { likes, author, url } = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes, author, url },
    { new: true }
  );

  response.json(updatedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
