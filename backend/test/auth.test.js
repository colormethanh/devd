const supertest = require("supertest");
let chai = require("chai");

const StartApp = require("../app.js");
const { ConnectDB, DisconnectDB, Controllers } = require("../database");
const { expect } = chai;

const {
  clearDB,
  seedDB,
  superTestLogin,
  models,
} = require("./utils/testHelper.js");

describe("AUTHORIZATION", () => {
  let seedResults;

  before(async () => {
    await ConnectDB();
  });

  after(async () => {
    await DisconnectDB();
  });

  beforeEach(async () => {
    await clearDB();
    seedResults = await seedDB();
  });

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

    it("should return 403 for an invalid refresh token", async () => {
      const res = await supertest(StartApp(Controllers))
        .post("/auth/refresh-token")
        .send({
          refreshToken: {
            token: "invalidToken",
            user_id: seedResults.testUser._id,
          },
        })
        .expect(403);

      expect(res.body.payload).to.have.property(
        "message",
        "Invalid or expired refresh token"
      );
    });

    it("should return 403 error for expired refresh token", async () => {
      const loginResponse = await superTestLogin();
      const { token, refreshToken } = loginResponse.body.payload;

      const refreshTokenInDB = await models.RefreshTokenModel.findOne({
        token: refreshToken.token,
      });

      refreshTokenInDB.expiresAt = Date.now();

      refreshTokenInDB.save();

      const res = await supertest(StartApp(Controllers))
        .post("/auth/refresh-token")
        .send({
          refreshToken,
        })
        .expect(403);

      expect(res.body.payload).to.have.property(
        "message",
        "Invalid or expired refresh token"
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

  describe("POST /auth/signup", () => {
    it("should return create user in db", async () => {
      const postResponse = await supertest(StartApp(Controllers))
        .post("/auth/signup")
        .send({
          username: "lameguy",
          password: "lameguypassword",
          email: "lameguy@aol.com",
        })
        .expect(200);

      expect(postResponse.body.payload).to.have.property("user_id");
      const userInDB = models.UserModel.findById(
        postResponse.body.payload.user_id
      );

      expect(userInDB);
    });

    it("should return accessToken and refreshToken", async () => {
      const postResponse = await supertest(StartApp(Controllers))
        .post("/auth/signup")
        .send({
          username: "lameguy",
          password: "lameguypassword",
          email: "lameguy@aol.com",
        })
        .expect(200);

      expect(postResponse.body.payload).to.have.property("accessToken");

      expect(postResponse.body.payload).to.have.property("refreshToken");
    });

    it("should return 400 error if duplicate username", async () => {
      const postResponse = await supertest(StartApp(Controllers))
        .post("/auth/signup")
        .send({
          username: "coolguy",
          password: "coolguypassword",
          email: "coolguy@gmail.com",
        })
        .expect(400);
    });

    it("should return 400 error if missing credentials", async () => {
      const postResponse = await supertest(StartApp(Controllers))
        .post("/auth/signup")
        .send({})
        .expect(400);
    });
  });
});
