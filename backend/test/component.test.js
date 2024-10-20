const supertest = require("supertest");
const mongoose = require("mongoose");
let chai = require("chai");
const StartApp = require("../app.js");
const { ConnectDB, DisconnectDB, Controllers } = require("../database");

const { expect } = chai;

const {
  clearDB,
  models,
  superTestLogin,
  seedDB,
} = require("./utils/testHelper.js");

describe("COMPONENT", () => {
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

  describe("GET /projects/:project_id/components", () => {
    it("Should retrieve a list of components for a project", async () => {
      const getResponse = await supertest(StartApp(Controllers))
        .get(`/projects/${seedResults.testProject._id}/components`)
        .expect(200);
      expect(getResponse.body.payload).to.have.property("components");
      expect(getResponse.body.payload.components).to.be.an("array");
      expect(getResponse.body.payload.components).to.have.lengthOf(1);
    });

    it(
      "should return only visible pages if user is not signed in and not a guest"
    );

    it(
      "should return only visible invisible pages if the used is signed in and either a guest or an admin"
    );
  });

  describe("POST /projects/:project_id/components", () => {
    it("Should post a new component to db and return the new components id", async () => {
      const loginResponse = superTestLogin();
      const token = (await loginResponse).body.payload.token;

      const postResponse = await supertest(StartApp(Controllers))
        .post(`/projects/${seedResults.testProject._id}/components`)
        .set("authorization", `Bearer ${token}`)
        .send({
          name: "My cool component",
          description: "A cool component, for a cool guy",
          snippet: "<div> <h1> Hello World! </h1> </div>",
          pages: [seedResults.testPage._id],
        })
        .expect(200);

      expect(postResponse.body.payload.component_id);
      const pageInDb = models.ComponentModel.findById(
        postResponse.body.payload.components_id
      );

      expect(pageInDb);
    });

    it("Should return error if not logged in", async () => {
      const res = await supertest(StartApp(Controllers))
        .post(`/projects/${seedResults.testProject._id}/components`)
        .send({
          name: "My cool component",
          description: "A cool component, for a cool guy",
          snippet: "<div> <h1> Hello World! </h1> </div>",
          pages: [seedResults.testPage._id],
        })
        .expect(401);
    });
    it("Should not post if logged in user it not the owner", async () => {
      const loginResponse = superTestLogin();
      const token = (await loginResponse).body.payload.token;

      const res = await supertest(StartApp(Controllers))
        .post(`/projects/${seedResults.testProject2._id}/components`)
        .set("authorization", `Bearer ${token}`)
        .send({
          name: "My cool component",
          description: "A cool component, for a cool guy",
          snippet: "<div> <h1> Hello World! </h1> </div>",
          pages: [seedResults.testPage2._id],
        })
        .expect(403);
    });

    it("should not post if test page is not a part of the project");
  });

  describe("GET /projects/:project_id/components/:page_id", () => {
    it("Should retrieve a list of components from a page");
  });

  describe("GET /projects/:project_id/components/:component_id", () => {
    it("Should return a component, given it's id", async () => {
      const getResponse = await supertest(StartApp(Controllers))
        .get(
          `/projects/${seedResults.testProject._id}/components/${seedResults.testComponent._id}`
        )
        .expect(200);

      expect(getResponse.body.payload.component._id).to.equal(
        seedResults.testComponent._id.toString()
      );
    });

    it("Should return an error if the given id is not in the db", async () => {
      const getResponse = await supertest(StartApp(Controllers))
        .get(
          `/projects/${
            seedResults.testProject._id
          }/components/${new mongoose.Types.ObjectId()}`
        )
        .expect(404);
    });

    it("Should return an error if the given id is not an id", async () => {
      const getResponse = await supertest(StartApp(Controllers))
        .get(`/projects/${seedResults.testProject._id}/components/${2324324}`)
        .expect(400);
    });

    it(
      "should return only if component is visible when user is not signed in and not a guest"
    );

    it(
      "should return an invisible component if the used is signed in and either a guest or an admin"
    );
  });
});
