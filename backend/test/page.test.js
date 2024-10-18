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

describe("PAGE", () => {
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

  describe("GET /projects/:project_id/pages", () => {
    it("should return all page ids for a specific project", async () => {
      const res = await supertest(StartApp(Controllers))
        .get(`/projects/${seedResults.testProject._id}/pages`)
        .expect(200);
      expect(res.body.payload).to.have.property("pages");
      expect(res.body.payload.pages).to.be.an("array");
      const project = await ProjectModel.findById(
        seedResults.testProject._id
      ).select("pages -_id");
      const projectPages = project.pages.map((page) => page.toString());

      expect(res.body.payload.pages).to.eql(projectPages);
    });
  });

  describe("POST /project/:project_id/pages", () => {
    it("should post a new page and return object id", async () => {
      const loginResponse = await superTestLogin();
      const token = loginResponse.body.payload.token;

      const res = await supertest(StartApp(Controllers))
        .post(`/projects/${seedResults.testProject._id}/pages`)
        .set("authorization", `Bearer ${token}`)
        .send({
          name: "Page for testing",
          description: "A new project used for testing",
        })
        .expect(200);

      expect(res.body.payload).to.have.property("page_id");

      const pageInDB = await models.PageModel.findById(
        res.body.payload.page_id
      );
      expect(pageInDB);

      const parentProject = await models.ProjectModel.findById(
        seedResults.testProject._id
      );
      expect(parentProject.pages).includes(
        new mongoose.Types.ObjectId(res.body.payload.page_id)
      );
    });

    it("should return an error if there are missing attributes", async () => {
      const loginResponse = await superTestLogin();
      const token = loginResponse.body.payload.token;

      // Testing with empty body
      await supertest(StartApp(Controllers))
        .post(`/projects/${seedResults.testProject._id}/pages`)
        .set("authorization", `Bearer ${token}`)
        .send({})
        .expect(400);

      // Testing with empty body properties
      await supertest(StartApp(Controllers))
        .post(`/projects/${seedResults.testProject._id}/pages`)
        .set("authorization", `Bearer ${token}`)
        .send({
          name: "",
          description: "",
        })
        .expect(400);
    });

    it("Should return error if not logged in", async () => {
      const res = await supertest(StartApp(Controllers))
        .post(`/projects/${seedResults.testProject._id}/pages`)
        .send({
          name: "Page for testing",
          description: "A new project used for testing",
        })
        .expect(401);
    });
  });

  describe("GET /project/:project_id/pages/:page_id", () => {
    it("Should return page from given page_id", async () => {
      const res = await supertest(StartApp(Controllers))
        .get(
          `/projects/${seedResults.testProject._id}/pages/${seedResults.testPage._id}`
        )
        .expect(200);
      expect(res.body.payload.page).to.have.property(
        "_id",
        seedResults.testPage._id.toString()
      );
    });

    it("Should return an error if invalid_id", async () => {
      // Id does not exist
      const res = await supertest(StartApp(Controllers))
        .get(
          `/projects/${
            seedResults.testProject._id
          }/pages/${new mongoose.Types.ObjectId()}`
        )
        .expect(404);
      // page_id is not an objectId
      const res2 = await supertest(StartApp(Controllers))
        .get(`/projects/${seedResults.testProject._id}/pages/${12345678}`)
        .expect(500);
    });

    // todo: page is not involved with project
  });
});
