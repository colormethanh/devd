const supertest = require("supertest");
let chai = require("chai");
const mongoose = require("mongoose");

const StartApp = require("../app.js");
const { ConnectDB, DisconnectDB, Controllers } = require("../database");

const { expect } = chai;

const {
  clearDB,
  models,
  superTestLogin,
  seedDB,
} = require("./utils/testHelper.js");
const ProjectModel = require("../models/Project.js");

describe("PROJECTS", () => {
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

    it("Should post a project in a document and return Object ID", async () => {
      const loginResponse = await superTestLogin();
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
      const loginResponse = await superTestLogin();

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

  describe("GET /projects/:project_id", () => {
    it("should return the specified project", async () => {
      const res = await supertest(StartApp(Controllers))
        .get(`/projects/${seedResults.testProject._id}`)
        .expect(200);

      expect(res.body.payload).to.have.property(
        "_id",
        seedResults.testProject._id.toString()
      );
      expect(res.body.payload).to.have.property("name");
      expect(res.body.payload).to.have.property("description");
      expect(res.body.payload).to.have.property("date_created");
      expect(res.body.payload).to.have.property(
        "owner",
        seedResults.testUserId.toString()
      );
      expect(res.body.payload).to.have.property("features");
      expect(res.body.payload).to.have.property("components");
      expect(res.body.payload).to.have.property("pages");
      expect(res.body.payload).to.have.property("tasks");
      expect(res.body.payload).to.have.property("guests");
    });

    it("should return an error if the the project_id is invalid", async () => {
      const res = await supertest(StartApp(Controllers))
        .get(`/projects/${seedResults.testUserId}`)
        .expect(404);
      expect(res.body).to.have.property("message", "Error");
    });
  });
});
