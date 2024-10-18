const supertest = require("supertest");
const { Controllers } = require("../../database");
const StartApp = require("../../app.js");

const UserModel = require("../../models/User");
const ProjectModel = require("../../models/Project");
const PageModel = require("../../models/Page");
const ComponentModel = require("../../models/Components");

const models = { UserModel, ProjectModel, PageModel, ComponentModel };

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
  // todo: rewrite seed to use models instead of controller
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

  const testProject2 = await Controllers.projectController.postNewProject(
    "Second Test project",
    "The second project used for testing"
  );

  const testPage = await Controllers.pageController.postPage(
    "Page for testing",
    "A page used for testing",
    testProject._id
  );

  const testPage2 = await Controllers.pageController.postPage(
    "Second page for testing",
    "A second page used for testing",
    testProject._id
  );

  const testComponent = new ComponentModel({
    name: "Button Component for testing",
    description: "A reusable button component for various UI purposes.",
    snippet: "<button class='btn-primary'>Click Me</button>",
    children: [],
    parents: [],
    images: [],
    project: testProject._id,
    date_created: Date.now(),
  });
  await testComponent.save();

  testPage.components.push(testComponent._id);
  await testPage.save();

  testProject.components.push(testComponent._id);
  await testProject.save();

  return {
    testProject,
    testProject2,
    testUserId,
    testPage,
    testPage2,
    testComponent,
  };
};

module.exports = { clearDB, models, superTestLogin, seedDB };
