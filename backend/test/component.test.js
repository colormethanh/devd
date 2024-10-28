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

  describe("GET /projects/:project_id/components/public", () => {
    it("should return only public components if user is not owner or guest", async () => {
      const getResponse = await supertest(StartApp(Controllers))
        .get(`/projects/${seedResults.testProject._id}/components/public`)
        .expect(200);
      expect(getResponse.body.payload).to.have.property("components");
      expect(getResponse.body.payload.components).to.be.an("array");

      const component = await models.ComponentModel.findById(
        getResponse.body.payload.components[0]
      );

      expect(component).to.have.property("visibility", "public");
    });
  });

  describe("GET /projects/:project_id/components", () => {
    it("Should retrieve a list of all components for a project if owner or guest", async () => {
      const loginResponse = await superTestLogin();
      const token = loginResponse.body.payload.token;

      const getResponse = await supertest(StartApp(Controllers))
        .get(`/projects/${seedResults.testProject._id}/components`)
        .set("authorization", `Bearer ${token}`)
        .expect(200);
      expect(getResponse.body.payload).to.have.property("components");
      expect(getResponse.body.payload.components).to.be.an("array");
      expect(getResponse.body.payload.components).to.have.lengthOf(2);
    });

    it("Should return error if user is not logged in", async () => {
      const getResponse = await supertest(StartApp(Controllers))
        .get(`/projects/${seedResults.testProject._id}/components`)
        .expect(401);
    });

    it("Should retrieve a list of public components if logged in user is not guest or owner", async () => {
      const loginResponse = await superTestLogin("mrpink", "mrpinkpassword");
      const token = loginResponse.body.payload.token;

      const getResponse = await supertest(StartApp(Controllers))
        .get(`/projects/${seedResults.testProject._id}/components`)
        .set("authorization", `Bearer ${token}`)
        .expect(200);
      expect(getResponse.body.payload).to.have.property("components");
      expect(getResponse.body.payload.components).to.be.an("array");

      expect(getResponse.body.payload.components[0]).to.have.property(
        "visibility",
        "public"
      );
    });
  });

  describe("POST /projects/:project_id/components", () => {
    it("Should post a new component to db and return the new components id", async () => {
      const loginResponse = await superTestLogin();
      const token = await loginResponse.body.payload.token;

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

    it("Should add the newly created component into the projects DB", async () => {
      const loginResponse = await superTestLogin();
      const token = await loginResponse.body.payload.token;

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

      const projectComponents = await models.ProjectModel.findById(
        seedResults.testProject._id
      ).select("components ");

      component = projectComponents.components.find(
        (component) => (component = postResponse.body.payload.component_id)
      );
      expect(component);
    });

    it("Should return 401 error if not logged in", async () => {
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

    it("Should not post if logged in user is not the owner", async () => {
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
  });

  describe("GET /projects/:project_id/components/page/:page_id/public", () => {
    it("Should retrieve a list of only public components from a page ", async () => {
      let getResponse = await supertest(StartApp(Controllers))
        .get(
          `/projects/${seedResults.testProject._id}/components/page/${seedResults.testPage._id}/public`
        )
        .expect(200);

      expect(getResponse.body.payload.components).to.be.an("array");
    });
  });

  describe("GET /projects/:project_id/components/page/:page_id", () => {
    it("Should retrieve a list of components from a page", async () => {
      let loginResponse = await superTestLogin();
      let tokens = loginResponse.body.payload;

      let getResponse = await supertest(StartApp(Controllers))
        .get(
          `/projects/${seedResults.testProject._id}/components/page/${seedResults.testPage._id}`
        )
        .set("authorization", `Bearer ${tokens.token}`)
        .expect(200);
      expect(getResponse.body.payload).to.be.an("array");
    });
  });

  describe("GET /projects/:project_id/components/:component_id/public", () => {
    it("Should return a component, given it's id", async () => {
      const getResponse = await supertest(StartApp(Controllers))
        .get(
          `/projects/${seedResults.testProject._id}/components/${seedResults.testComponent2._id}/public`
        )
        .expect(200);

      expect(getResponse.body.payload.component._id).to.equal(
        seedResults.testComponent2._id.toString()
      );
    });

    it("Should return 404 error if the given id is not in the db", async () => {
      const getResponse = await supertest(StartApp(Controllers))
        .get(
          `/projects/${
            seedResults.testProject._id
          }/components/${new mongoose.Types.ObjectId()}/public`
        )
        .expect(404);
    });

    it("Should return an error if the given id is not an id", async () => {
      const getResponse = await supertest(StartApp(Controllers))
        .get(
          `/projects/${
            seedResults.testProject._id
          }/components/${2324324}/public`
        )
        .expect(400);
    });

    it("should return visible component when user is not logged in", async () => {
      const loginResponse = await superTestLogin();
      const token = await loginResponse.body.payload.token;

      const getResponse = await supertest(StartApp(Controllers))
        .get(
          `/projects/${seedResults.testProject._id}/components/${seedResults.testComponent2._id}/public`
        )
        .expect(200);
      expect(getResponse.body.payload.component).to.have.property(
        "_id",
        seedResults.testComponent2._id.toString()
      );
    });

    it("should return 403 error when component is private and user is not logged in", async () => {
      const getResponse = await supertest(StartApp(Controllers))
        .get(
          `/projects/${seedResults.testProject._id}/components/${seedResults.testComponent._id}/public`
        )
        .expect(401);
    });

    it("should return an invisible component if the used is signed in and either a guest or an admin", async () => {
      const loginResponse = await superTestLogin();
      const tokens = loginResponse.body.payload;

      const getResponse = await supertest(StartApp(Controllers))
        .get(
          `/projects/${seedResults.testProject._id}/components/${seedResults.testComponent._id}`
        )
        .set("authorization", `Bearer ${tokens.token}`)
        .expect(200);

      expect(getResponse.body.payload.component._id).to.equal(
        seedResults.testComponent._id.toString()
      );
    });
  });

  describe("PUT /project/:project_id/components/:component_id", () => {
    it("Should modify a component", async () => {
      const loginResponse = await superTestLogin();
      const tokens = loginResponse.body.payload;

      const putResponse = await supertest(StartApp(Controllers))
        .put(
          `/projects/${seedResults.testProject._id}/components/${seedResults.testComponent._id}`
        )
        .set("authorization", `Bearer ${tokens.token}`)
        .send({
          name: "Modified Component",
          description: "A modified component description",
          status: "done",
          visibility: "public",
          children: [seedResults.testComponent2._id],
        });
      // .expect(200);

      const updatedComponent = await models.ComponentModel.findById(
        seedResults.testComponent._id
      );

      expect(updatedComponent).to.have.property("name", "Modified Component");
      expect(updatedComponent.children).to.have.lengthOf(1);
    });

    it("should return 400 error if no body is provided");

    it("Should return 403 error if not guest or admin");

    it("should return 400 error if component is not associated with project");
  });

  describe("DELETE /project/:project_id/components/:component_id", () => {
    it("should delete a component", async () => {
      const loginResponse = await superTestLogin();
      const tokens = loginResponse.body.payload;

      const deleteResponse = await supertest(StartApp(Controllers))
        .delete(
          `/projects/${seedResults.testProject._id}/components/${seedResults.testComponent._id}`
        )
        .set("authorization", `Bearer ${tokens.token}`)
        .expect(200);

      const componentInDb = await models.ComponentModel.findById(
        seedResults.testComponent._id
      );
      expect(!componentInDb);
    });

    it("should return 403 error if not guest or admin");

    it("should return 400 error if component is not associated with project");
  });
});
