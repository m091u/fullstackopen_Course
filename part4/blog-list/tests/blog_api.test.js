const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");

const api = supertest(app);

let token;

beforeEach(async () => {
  const loginResponse = await api.post("/api/login").send({
    username: "testuser",
    password: "testpassword",
  });

  token = loginResponse.body.token;
});

describe("initial blogs retrieval", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("correct amount of blog posts is returned", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, 2);
  });

  test('blog posts have property "id" instead of "_id"', async () => {
    const response = await api.get("/api/blogs");

    for (const blog of response.body) {
      assert.strictEqual(typeof blog.id, "string");
    }
  });

  describe("addition of a new blog", () => {
    test("a valid blog can be added ", async () => {
      const newBlog = {
        title: "Test",
        author: "Test Author",
        url: "https://test.com",
        likes: 1,
      };
      console.log("Sending request with body:", newBlog);

      const initialBlogs = await api.get("/api/blogs");

      // await api
      //   .post("/api/blogs")
      //   .send(newBlog)
      //   .set('Authorization', `Bearer ${token}`)
      //   .expect(201)
      //   .expect("Content-Type", /application\/json/);

      // const response = await api.get("/api/blogs");
      // console.log('Received response:', response.body);
      const response = await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", `Bearer ${token}`) // Set Authorization header with token
        .expect(201)
        .expect("Content-Type", /application\/json/);

      console.log("Received response:", response.body);

      const titles = response.body.map((r) => r.title);

      assert.strictEqual(response.body.length, initialBlogs.body.length + 1);
      assert(titles.includes("Test Blog Post 2"));
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
        .set("Authorization", `Bearer ${token}`)
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
  });

  describe("updating an individual blog post", () => {
    test("succeeds updating blog", async () => {
      const initialBlogs = await api.get("/api/blogs");
      const blogToUpdate = initialBlogs.body[1];

      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
      };

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const updatedBlogs = await api.get("/api/blogs");
      const updatedBlogFromServer = updatedBlogs.body.find(
        (blog) => blog.id === blogToUpdate.id
      );
      assert.strictEqual(updatedBlogFromServer.likes, blogToUpdate.likes + 1);
    });

    test("fails with status code 400 if request body is invalid", async () => {
      const initialBlogs = await api.get("/api/blogs");
      const blogToUpdate = initialBlogs.body[1];
      const updatedBlog = {
        ...blogToUpdate,
        likes: "invalid value",
      };

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(400);
    });

    test("fails with status code 404 if blog post does not exist", async () => {
      const invalidId = "5a3d5da59070081a82a3445";
      const updatedBlog = {
        title: "Non-existing blog post",
        author: "Non-existing author",
        url: "https://example.com",
        likes: 5,
      };

      await api.put(`/api/blogs/${invalidId}`).send(updatedBlog).expect(400);
    });
  });

  describe("deletion of a blog", async () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const initialBlogs = await api.get("/api/blogs");
      const blogToDelete = initialBlogs.body[1];

      await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

      const finalBlogs = await api.get("/api/blogs");

      assert.strictEqual(finalBlogs.body.length, initialBlogs.body.length - 1);
      const titles = finalBlogs.body.map((r) => r.title);
      assert(!titles.includes(blogToDelete.titles));
    });

    test("fails with status code 400 if data invalid", async () => {
      const invalidId = "5a3d5da59070081a82a3445";

      await api.get(`/api/blogs/${invalidId}`).expect(404);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
