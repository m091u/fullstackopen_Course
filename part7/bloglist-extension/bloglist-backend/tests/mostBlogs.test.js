const { describe, test } = require("node:test");
const assert = require("node:assert");

const { mostBlogs } = require("../utils/list_helper");

describe("most blogs", () => {
    const blogs = [
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 12,
          __v: 0,
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0,
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0,
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0,
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0,
        },
      ];

  test("when list has multiple blogs with different authors, return author with most blogs", () => {
    const result = mostBlogs(blogs);
    assert.strictEqual(result.author, "Robert C. Martin");
    assert.strictEqual(result.blogs, 3);
  });

  test("when list has multiple blogs with same number of authors, return any author", () => {
    const result = mostBlogs(blogs.slice(0, 3));
    assert.strictEqual(result.author, "Edsger W. Dijkstra");
    assert.strictEqual(result.blogs, 2);
  });

  test("when list has only one blog, return that author", () => {
    const result = mostBlogs([blogs[0]]);
    assert.strictEqual(result.author, "Edsger W. Dijkstra");
    assert.strictEqual(result.blogs, 1);
  });
});
