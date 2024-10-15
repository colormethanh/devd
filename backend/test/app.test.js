const supertest = require("supertest");
let chai = require("chai");

const StartApp = require("../app.js");
const { ConnectDB, Controllers } = require("../database");

const { expect } = chai;

//Helpers to reset test DB data
const {
  clearDocuments,
  models,
  superTestLogin,
} = require("./utils/testHelper.js");

describe("AUTHORIZATION", () => {
  before(async () => {
    await ConnectDB();
  });

  describe("GET auth/login", () => {
    it("should login with correct credentials", async () => {
      const res = await supertest(StartApp(Controllers))
        .post("/auth/login")
        .send({ username: "coolguy", password: "coolguypassword" })
        .expect(200);

      expect(res.body.payload).to.have.property("token");
      const tokenParts = res.body.payload.token.split(".");
      expect(tokenParts).to.have.lengthOf(3);
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

describe("Projects", () => {
  let token;

  before(async () => {
    await ConnectDB();
  });

  after(async () => {
    await clearDocuments(models.ProjectModel);
  });

  describe("GET /projects", () => {
    it("should return all projects", async () => {
      const res = await supertest(StartApp(Controllers))
        .get("/projects")
        .expect(200);

      expect(res.body.payload).to.be.an("array");
    });
  });

  describe("POST /projects", () => {
    it("Should return error if not logged in", async () => {
      const res = await supertest(StartApp(Controllers))
        .post("/projects")
        .send({
          name: "Model for testing",
          description: "Description for testing",
        })
        .expect(401);

      expect(res.body).to.be.an("object");
      expect(res.statusCode).to.equal(401);
    });

    it("Should post a project in a document", async () => {
      const loginResponse = await supertest(StartApp(Controllers))
        .post("/auth/login")
        .send({ username: "coolguy", password: "coolguypassword" })
        .expect(200);

      const token = loginResponse.body.payload.token;

      const postResponse = await supertest(StartApp(Controllers))
        .post("/projects")
        .set("authorization", `Bearer ${token}`)
        .send({
          name: "Project for testing",
          description: "A new project used for testing",
        })
        .expect(200);
      expect(postResponse.body.payload).to.have.property("project_id");
    });

    it("Should return an error if you don't provide proper details", async () => {
      const loginResponse = await supertest(StartApp(Controllers))
        .post("/auth/login")
        .send({ username: "coolguy", password: "coolguypassword" })
        .expect(200);

      const token = loginResponse.body.payload.token;

      const postResponse = await supertest(StartApp(Controllers))
        .post("/projects")
        .set("authorization", `Bearer ${token}`)
        .send({ name: "", description: "" })
        .expect(400);
      expect(postResponse.body).to.have.property("message", "Error");
      expect(postResponse.body.payload).to.have.property("message");
      expect(postResponse.body.payload).to.have.property("statusCode", 400);
    });
  });
});
