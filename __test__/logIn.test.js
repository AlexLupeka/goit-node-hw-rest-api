const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
require("dotenv").config();

mongoose.set("strictQuery", true);

const { DB_HOST } = process.env;

describe("login/singup test", () => {
  let server;
  beforeAll(() => (server = app.listen(3000)));
  afterAll(() => server.close());

  beforeEach(async () => {
    await mongoose.connect(DB_HOST);
  });

  afterEach(async () => {
    await mongoose.connection.close();
  });

  test("test for login", async () => {
    const loginData = {
      email: "notalexander@gmail.com",
      password: "qwerty",
    };
    const res = await request(app).post("/api//login").send(loginData);

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeTruthy();
    expect(res.body.user.email).toBeTruthy();
    expect(res.body.user.subscription).toBeTruthy();
    expect(typeof res.body.user.email).toBe("string");
    expect(typeof res.body.user.subscription).toBe("string");
  });
});
