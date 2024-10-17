const supertest = require("supertest");
let chai = require("chai");
const mongoose = require("mongoose");

const StartApp = require("../app.js");
const { ConnectDB, Controllers } = require("../database");

const { expect } = chai;

const {
  clearDB,
  models,
  superTestLogin,
  seedDB,
} = require("./utils/testHelper.js");
const ProjectModel = require("../models/Project.js");

describe("AUTHORIZATION", () => {
  before(async () => {
    await ConnectDB();
    await clearDB();
    await seedDB();
  });

  after(async () => {
    await clearDB();
  });

  describe("POST auth/login", () => {
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

  describe("POST auth/signup", async () => {
    it("Should create a new user with correctly supplied parameters", async () => {
      const res = await supertest(StartApp(Controllers))
        .post("/auth/signup")
        .send({
          email: "lameguyemail@aol.com",
          username: "lameguy",
          password: "lameguypassword",
        })
        .expect(200);
      expect(res.body.payload).to.have.property("token");
    });

    it("Should return error if user already exists", async () => {
      const res = await supertest(StartApp(Controllers))
        .post("/auth/signup")
        .send({
          email: "coolguyemail@gmail.com",
          username: "coolguy",
          password: "coolguypassword",
        })
        .expect(400);
      expect(res.body).to.have.property("message", "Error");
      expect(res.body.payload).to.have.property(
        "message",
        "Username or email already taken"
      );
    });

    it("Should return error if no parameters are submitted", async () => {
      const res = await supertest(StartApp(Controllers))
        .post("/auth/signup")
        .send({})
        .expect(400);

      expect(res.body).to.have.property("message", "Error");
      expect(res.body.payload).to.have.property(
        "message",
        "Email, Username, and Password are required"
      );
    });
  });
});

describe("USER", () => {
  before(async () => {
    await ConnectDB();
    await clearDB();
    await seedDB();
  });

  after(async () => {
    await clearDB();
  });
  describe("GET user/me", () => {
    it("Should return error if not logged in", async () => {
      const res = await supertest(StartApp(Controllers))
        .get("/user/me")
        .expect(401);
      expect(res.body).to.be.an("object");
      expect(res.statusCode).to.equal(401);
    });

    it("Should return user object", async () => {
      const loginResponse = superTestLogin();
      const token = (await loginResponse).body.payload.token;

      const res = await supertest(StartApp(Controllers))
        .get("/user/me")
        .set("authorization", `Bearer ${token}`)
        .expect(200);
      expect(res.body.payload.user).to.be.an("object");
      expect(res.body.payload.user).to.have.property("_id");
      expect(res.body.payload.user).to.have.property("email");
      expect(res.body.payload.user).to.have.property("username");
    });
  });
});

describe("PROJECTS", () => {
  let seedResults;

  before(async () => {
    await ConnectDB();
    await clearDB();
    seedResults = await seedDB();
  });

  after(async () => {
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

    it("Should post a project in a document", async () => {
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

describe("PAGE", () => {
  let seedResults;

  before(async () => {
    await ConnectDB();
    await clearDB();
    seedResults = await seedDB();
  });

  after(async () => {
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
    it("should post a new page", async () => {
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

    // Test error occurs if post without correct attributes
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

    // page does not exist

    // page is not involved in project
  });
});
