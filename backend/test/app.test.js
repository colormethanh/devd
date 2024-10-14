const supertest = require("supertest");
let chai = require("chai");

const StartApp = require("../app.js");
const { ConnectDB, Controllers } = require("../database");

const { expect } = chai;

beforeEach((done) => {
  ConnectDB();
  done();
});

describe("Auth", () => {
  describe("GET auth/login", () => {
    it("should login with correct credential", (done) => {
      supertest(StartApp(Controllers))
        .post("/auth/login")
        .send({ username: "coolguy", password: "coolguypassword" })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.payload).to.have.property("token");
          console.log(res.body.payload);
          const tokenParts = res.body.payload.token.split(".");
          expect(tokenParts).to.have.lengthOf(3);
          done();
        });
    });

    it("should return 401 for invalid credentials", (done) => {
      supertest(StartApp(Controllers))
        .post("/auth/login")
        .send({ username: "invaliduser", password: "wrongpassword" })
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property(
            "message",
            "Incorrect username or password"
          );
          expect(res.body).to.have.property("statusCode", 401);
          done();
        });
    });
  });
});

describe("GET /projects", () => {
  it("should return all projects", (done) => {
    supertest(StartApp(Controllers))
      .get("/projects")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.payload).to.be.an("array");
        done();
      });
  });
});
