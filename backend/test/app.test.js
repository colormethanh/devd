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
  seedDB,
} = require("./utils/testHelper.js");

describe("AUTHORIZATION", () => {
  before(async () => {
    await ConnectDB();
    await seedDB();
  });

  after(async () => {
    await clearDocuments();
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

      console.log(res.body);
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

      console.log(res.body);
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

      console.log(res.body);
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
    await seedDB();
  });

  after(async () => {
    await clearDocuments();
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
  before(async () => {
    await ConnectDB();
    await seedDB();
  });

  after(async () => {
    await clearDocuments();
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
});

// describe("PAGE", () => {
//   before(async () => {
//     await ConnectDB();
//   });

//   after(async () => {
//     await clearDocuments(models.ProjectModel);
//   });

// });
