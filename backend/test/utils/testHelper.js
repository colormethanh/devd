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
  let testUser = new UserModel({
    username: "coolguy",
    email: "coolguyemail@gmail.com",
  });
  testUser.setPassword("coolguypassword");
  testUser = await testUser.save();

  let testUser2 = new UserModel({
    username: "lukewarmguy",
    email: "lukewarmguy@gmail.com",
  });
  testUser2.setPassword("lukewarmguypassword");
  testUser2 = await testUser2.save();

  // Create testProject and make testUser owner of testProject1
  // Create testProject2 and make testUser the owner and testUser a guest
  const testProject = await Controllers.projectController.postNewProject(
    "Test project",
    "A project for testing",
    testUser._id
  );
  testUser.projects.push({ project: testProject._id, role: "admin" });

  const testProject2 = await Controllers.projectController.postNewProject(
    "Second Test project",
    "The second project used for testing"
  );
  testUser2.projects.push({ project: testProject2._id, role: "admin" });
  testUser.projects.push({ project: testProject2._id, role: "guest" });

  testUser.save();
  testUser2.save();

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
    testUser,
    testUser2,
    testPage,
    testPage2,
    testComponent,
  };
};

module.exports = { clearDB, models, superTestLogin, seedDB };
