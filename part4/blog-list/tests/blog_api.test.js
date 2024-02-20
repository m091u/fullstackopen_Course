const { test, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("correct amount of blog posts is returned", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, 3);
});

test('blog posts have property "id" instead of "_id"', async () => {
  const response = await api.get("/api/blogs");

  for (const blog of response.body) {
    assert.strictEqual(typeof blog.id, "string");
  }
});

test("a valid blog can be added ", async () => {
  const newBlog = {
    title: "Test Blog Post 2",
    author: "Test Author 2",
    url: "https://test2.com",
    likes: 1,
  };

  const initialBlogs = await api.get("/api/blogs");

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const titles = response.body.map((r) => r.title);

  assert.strictEqual(response.body.length, initialBlogs.body.length + 1);
  assert(titles.includes("Test Blog Post"));
});

test("missing likes property is defaulted to 0 ", async () => {
  const newBlog = {
    title: "Test Blog Post 2",
    author: "Test Author 2",
    url: "https://test2.com",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 0);
});

test("blog without title or url is not added", async () => {
  const initialBlogs = await api.get("/api/blogs");

  const newBlog = {
    author: "Test Author 3",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, initialBlogs.body.length);
});

after(async () => {
  await mongoose.connection.close();
});
