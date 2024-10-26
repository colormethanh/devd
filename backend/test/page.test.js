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

  describe("GET /project/:project_id/pages", () => {
    it("Should return all pages from project if admin or guest", async () => {
      const loginResponse = await superTestLogin();
      const tokens = loginResponse.body.payload;

      const res = await supertest(StartApp(Controllers))
        .get(`/projects/${seedResults.testProject._id}/pages`)
        .set("authorization", `Bearer ${tokens.token}`)
        .expect(200);
      expect(res.body.payload).to.have.property("pages");
      expect(res.body.payload.pages).to.be.an("array");
      expect(res.body.payload.pages).to.have.lengthOf(2);
    });

    it("Should return public pages if logged in but not admin or guest", async () => {
      const loginResponse = await superTestLogin(
        "lukewarmguy",
        "lukewarmguypassword"
      );
      const tokens = loginResponse.body.payload;

      const res = await supertest(StartApp(Controllers))
        .get(`/projects/${seedResults.testProject._id}/pages`)
        .set("authorization", `Bearer ${tokens.token}`)
        .expect(200);
      expect(res.body.payload).to.have.property("pages");
      expect(res.body.payload.pages).to.be.an("array");
      expect(res.body.payload.pages).to.have.lengthOf(1);
      expect(res.body.payload.pages[0]).to.have.have.property(
        "visibility",
        "public"
      );
    });
  });

  describe("GET /projects/:project_id/pages/public", () => {
    it("should return public pages for a specific project", async () => {
      const res = await supertest(StartApp(Controllers))
        .get(`/projects/${seedResults.testProject._id}/pages/public`)
        .expect(200);
      expect(res.body.payload).to.have.property("pages");
      expect(res.body.payload.pages).to.be.an("array");
      expect(res.body.payload.pages).to.have.lengthOf(1);
    });
  });

  describe("GET /project/:project_id/pages/:page_id/public", () => {
    it("Should return page from given page_id", async () => {
      const res = await supertest(StartApp(Controllers))
        .get(
          `/projects/${seedResults.testProject._id}/pages/${seedResults.testPage._id}/public`
        )
        .expect(200);
      expect(res.body.payload.page).to.have.property(
        "_id",
        seedResults.testPage._id.toString()
      );
    });

    it("Should return 403 error if given private id", async () => {
      const res = await supertest(StartApp(Controllers))
        .get(
          `/projects/${seedResults.testProject._id}/pages/${seedResults.testPage2._id}/public`
        )
        .expect(403);
    });

    it("Should return an error if invalid_id", async () => {
      // Id does not exist
      const res = await supertest(StartApp(Controllers))
        .get(
          `/projects/${
            seedResults.testProject._id
          }/pages/${new mongoose.Types.ObjectId()}/public`
        )
        .expect(404);

      // page_id is not an objectId
      const res2 = await supertest(StartApp(Controllers))
        .get(
          `/projects/${seedResults.testProject._id}/pages/${12345678}/public`
        )
        .expect(500);
    });
  });

  describe("GET /project/:project_id/pages/:page_id", () => {
    it("should return 403 if user is not admin or guest", async () => {
      const loginResponse = await superTestLogin(
        "lukewarmguy",
        "lukewarmguypassword"
      );
      const tokens = loginResponse.body.payload;

      const res = await supertest(StartApp(Controllers))
        .get(
          `/projects/${seedResults.testProject._id}/pages/${seedResults.testPage2._id}`
        )
        .set("authorization", `Bearer ${tokens.token}`)
        .expect(403);
    });

    it("should return private page if user owner or admin", async () => {
      const loginResponse = await superTestLogin();
      const tokens = loginResponse.body.payload;

      const getResponse = await supertest(StartApp(Controllers))
        .get(
          `/projects/${seedResults.testProject._id}/pages/${seedResults.testPage2._id}`
        )
        .set("authorization", `Bearer ${tokens.token}`)
        .expect(200);
    });

    it("should return an 400 error if page is not associated with project");
  });

  describe("POST /projects/:project_id/pages", () => {
    it("should post a new page and return valid object id", async () => {
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

    it("Should not post if the logged in user is not the owner", async () => {
      const loginResponse = await superTestLogin(
        "lukewarmguy",
        "lukewarmguypassword"
      );
      const token = loginResponse.body.payload.token;

      const res = await supertest(StartApp(Controllers))
        .post(`/projects/${seedResults.testProject._id}/pages`)
        .set("authorization", `Bearer ${token}`)
        .send({
          name: "Page for testing",
          description: "A new project used for testing",
        })
        .expect(403);
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

  describe("PUT /projects/:project_id/pages/:page_id", () => {
    it("should update a page", async () => {
      const loginResponse = await superTestLogin();
      const tokens = loginResponse.body.payload;

      const putResponse = await supertest(StartApp(Controllers))
        .put(
          `/projects/${seedResults.testProject._id}/pages/${seedResults.testPage._id}`
        )
        .set("authorization", `Bearer ${tokens.token}`)
        .send({
          name: "Modified Page",
          description: "A modified description",
          features: ["amazing new feature"],
          visibility: "public",
        })
        .expect(200);

      const updatedProject = await models.PageModel.findById(
        seedResults.testPage
      );

      expect(updatedProject).to.to.have.property("name", "Modified Page");
    });

    it("should correctly update features property");

    it("should return 403 error if user is not admin or guest");

    it("should return 400 error if page is not associated with page");

    it("should return 400 error if request has not body");
  });
});
