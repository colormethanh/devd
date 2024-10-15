const supertest = require("supertest");
const { Controllers } = require("../../database");
const StartApp = require("../../app.js");

const UserModel = require("../../models/User");
const ProjectModel = require("../../models/Project");

const models = { UserModel, ProjectModel };

const superTestLogin = async () => {
  return supertest(StartApp(Controllers))
    .post("/auth/login")
    .send({ username: "coolguy", password: "coolguypassword" })
    .expect(200);
};

const clearDocuments = async () => {
  try {
    await Promise.all(
      Object.keys(models).map((key) => {
        return models[key].deleteMany({});
      })
    );
  } catch (err) {
    console.log(err);
    return;
  }
};

const seedDB = async () => {
  const testUserId = await Controllers.authController.signupAndGetId(
    "coolguyemail@gmail.com",
    "coolguy",
    "coolguypassword"
  );

  const testProject = await Controllers.projectController.postNewProject(
    "Test project",
    "A project for testing",
    testUserId
  );
};

module.exports = { clearDocuments, models, superTestLogin, seedDB };
