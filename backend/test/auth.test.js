const supertest = require("supertest");
let chai = require("chai");
const keys = require("../config/keys.js");
const jwt = require("jwt-simple");

const StartApp = require("../app.js");
const { ConnectDB, DisconnectDB, Controllers } = require("../database");
const { expect } = chai;

const { clearDB, seedDB, superTestLogin } = require("./utils/testHelper.js");

describe("AUTHORIZATION", () => {
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

  describe("POST /auth/login", () => {
    it("should login with correct credentials", async () => {
      const res = await supertest(StartApp(Controllers))
        .post("/auth/login")
        .send({ username: "coolguy", password: "coolguypassword" })
        .expect(200);

      expect(res.body.payload).to.have.property("token");
      const tokenParts = res.body.payload.token.split(".");
      expect(tokenParts).to.have.lengthOf(3);

      expect(res.body.payload).to.have.property("refreshToken");
      const refreshTokenParts = res.body.payload.refreshToken.token.split(".");
      expect(refreshTokenParts).to.have.lengthOf(3);
    });

    it("should return a new access token with a valid refresh token", async () => {
      const loginResponse = await superTestLogin();

      const payload = loginResponse.body.payload;

      const res = await supertest(StartApp(Controllers))
        .post("/auth/refresh-token")
        .send({ refreshToken: payload.refreshToken })
        .expect(200);

      expect(res.body.payload).to.have.property("accessToken");
      expect(res.body.payload.accessToken).to.be.a("string");
    });

    it("should return 400 if refresh token is missing", async () => {
      const res = await supertest(StartApp(Controllers))
        .post("/auth/refresh-token")
        .send({})
        .expect(400);

      expect(res.body.payload).to.have.property(
        "message",
        "RefreshToken is required"
      );
    });

    it("should return 401 for invalid credentials", async () => {
      const res = await supertest(StartApp(Controllers))
        .post("/auth/login")
        .send({ username: "invaliduser", password: "wrongpassword" })
        .expect(401);

      expect(res.body.payload).to.have.property(
        "message",
        "Incorrect username or password"
      );
      expect(res.body.payload).to.have.property("statusCode", 401);
    });
  });
});
