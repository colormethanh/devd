const supertest = require("supertest");
const { Controllers } = require("../../database");
const StartApp = require("../../app.js");

const UserModel = require("../../models/User");
const ProjectModel = require("../../models/Project");
const PageModel = require("../../models/Page");

const models = { UserModel, ProjectModel, PageModel };

const superTestLogin = async () => {
  return supertest(StartApp(Controllers))
    .post("/auth/login")
    .send({ username: "coolguy", password: "coolguypassword" })
    .expect(200);
};

const clearDB = async () => {
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

  const testPage = await Controllers.pageController.postPage(
    "Page for testing",
    "A page used for testing",
    testProject._id
  );

  testProject.pages.push(testPage);
  testProject.save();

  return { testProject, testUserId, testPage };
};

module.exports = { clearDB, models, superTestLogin, seedDB };
