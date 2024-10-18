const supertest = require("supertest");
let chai = require("chai");
const mongoose = require("mongoose");

const StartApp = require("../app.js");
const { ConnectDB, DisconnectDB, Controllers } = require("../database");
const { expect } = chai;

const { clearDB, superTestLogin, seedDB } = require("./utils/testHelper.js");

describe("USER", () => {
  let token; // Store token for reuse across tests
  let seedResults;

  before(async () => {
    await ConnectDB();
  });

  after(async () => {
    await DisconnectDB();
  });

  // Connect to DB and seed data
  beforeEach(async () => {
    await clearDB();
    seedResults = await seedDB();
  });

  // Clear DB and disconnect after tests complete
  afterEach(async () => {
    await clearDB();
  });

  // Login before each test that needs a token
  beforeEach(async () => {
    const loginResponse = await superTestLogin();
    token = loginResponse.body.payload.token;
  });

  describe("GET /user/me", () => {
    it("Should return error if not logged in", async () => {
      const res = await supertest(StartApp(Controllers))
        .get("/user/me")
        .expect(401);

      expect(res.body).to.be.an("object");
      expect(res.statusCode).to.equal(401);
    });

    it("Should return user object", async () => {
      const res = await supertest(StartApp(Controllers))
        .get("/user/me")
        .set("authorization", `Bearer ${token}`)
        .expect(200);

      const { user } = res.body.payload;
      expect(user).to.be.an("object");
      expect(user).to.have.property("_id");
      expect(user).to.have.property("email");
      expect(user).to.have.property("username");
    });
  });
});
