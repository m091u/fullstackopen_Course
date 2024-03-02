const bcrypt = require("bcrypt");
const User = require("../models/user");
const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const helper = require("./test_helper");

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes("expected `username` to be unique"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("creation fails with proper statuscode and message if password is too short", async () => {
    const initialUsers = await api.get("/api/users");
    const newUser = {
      "username": "test",
      "name": "test",
      "password": "12",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);
    console.log(response.body); 
    assert(response.body.error.includes("Password must be at least 3 characters long."));

    const usersAtEnd = await helper.usersInDb();

    assert.strictEqual(usersAtEnd.length, initialUsers.body.length);
  })

  test("creation fails with proper statuscode and message if username is too short", async () => {
    const initialUsers = await api.get("/api/users");
    const newUser = {
      "username": "eo",
      "name": "test",
      "password": "12345",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);
    assert(response.body.error.includes("Username must be at least 3 characters long."));

    const usersAtEnd = await helper.usersInDb();

    assert.strictEqual(usersAtEnd.length, initialUsers.body.length);
  })

  test("creation fails with proper statuscode and message if password is missing", async () => {
    const initialUsers = await api.get("/api/users");
    const newUser = {
      "username": "test",
      "name": "testUser",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);
    assert(response.body.error.includes("Username and password are required."));
    const usersAtEnd = await helper.usersInDb();

    assert.strictEqual(usersAtEnd.length,initialUsers.body.length);
  });

  test("creation fails with proper statuscode and message if username is missing", async () => {
    const initialUsers = await api.get("/api/users");

    const newUser = {
      "name": "Superuser",
      "password": "password"
    };

   const response = await api.post("/api/users").send(newUser).expect(400);
    assert(response.body.error.includes("Username and password are required."));
    const usersAtEnd = await helper.usersInDb();

    assert.strictEqual(usersAtEnd.length,initialUsers.body.length);
  });

});
