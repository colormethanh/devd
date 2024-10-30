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
const { tokenForUser } = require("../services/passport.js");

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

    it("should return 401 error if expired token", async () => {
      const loginResponse = await superTestLogin();
      const token = loginResponse.body.payload.token;
      const fakeToken = tokenForUser(
        { _id: loginResponse.body.payload.refreshToken.user_id },
        -1
      );

      const postResponse = await supertest(StartApp(Controllers))
        .post("/projects")
        .set("authorization", `Bearer ${fakeToken}`)
        .send({
          name: "Project for testing",
          description: "A new project used for testing",
        })
        .expect(401);
    });

    it("Should return 401 error if invalid token", async () => {
      const loginResponse = await superTestLogin();
      const token = loginResponse.body.payload.token;

      const postResponse = await supertest(StartApp(Controllers))
        .post("/projects")
        .set("authorization", `Bearer abc.123.jwt`)
        .send({
          name: "Project for testing",
          description: "A new project used for testing",
        })
        .expect(401);

      const postResponse2 = await supertest(StartApp(Controllers))
        .post("/projects")
        .set("authorization", `NotBearer abc.123.jwt`)
        .send({
          name: "Project for testing",
          description: "A new project used for testing",
        })
        .expect(401);
    });

    it("Should add a newly posted project into user's project attribute", async () => {
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
      const user = await models.UserModel.findById(seedResults.testUser._id);
      expect(
        user.projects.some(
          (project) => project.project === postResponse.body.payload.project_id
        )
      );
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
      expect(res.body.payload).to.have.property(
        "owner",
        seedResults.testUser._id.toString()
      );
    });

    it("should return an error if the the project_id is invalid", async () => {
      const res = await supertest(StartApp(Controllers))
        .get(`/projects/${seedResults.testUser._id}`)
        .expect(404);
      expect(res.body).to.have.property("message", "Error");
    });
  });

  describe("PUT /projects/:project_id", () => {
    it("should return modified project that matches db", async () => {
      const loginResponse = await superTestLogin();
      const token = loginResponse.body.payload.token;

      const putResponse = await supertest(StartApp(Controllers))
        .put(`/projects/${seedResults.testProject._id}`)
        .set("authorization", `Bearer ${token}`)
        .send({
          name: "Cool project",
          description: "A cool project for a cool guy!",
          features: ["brand new feature"],
        })
        .expect(200);

      expect(putResponse.body.payload).to.have.property("updatedProject");
      const updatedProject = putResponse.body.payload.updatedProject;

      const projectInDB = await models.ProjectModel.findById(
        updatedProject._id
      );
      expect(projectInDB);

      expect(updatedProject).to.have.property("name", projectInDB.name);
    });

    it("should only update name and description");

    it("should return 404 error if the project does not exist");

    it("should return 400 error if nothing is supplied in body");

    it("should return 403 error if not owner of the project");
  });

  describe("DELETE /projects/:project_id", () => {
    it("should delete the project with the supplied project_id", async () => {
      const loginResponse = await superTestLogin();
      const token = loginResponse.body.payload.token;

      const deleteResponse = await supertest(StartApp(Controllers))
        .delete(`/projects/${seedResults.testProject._id}`)
        .set("authorization", `Bearer ${token}`)
        .expect(200);

      expect(deleteResponse.body.payload).to.be.a("string");

      const projectInDb = models.ProjectModel.findById(
        seedResults.testProject._id
      );
      expect(!projectInDb);
    });

    it(
      "should delete associated models on project deletion such as pages, components, and user"
    );

    it("should return error if no project_id is supplied");

    it("should return 404 if project does not exist");

    it("should return 403 error if user is not owner of the project");
  });
});
