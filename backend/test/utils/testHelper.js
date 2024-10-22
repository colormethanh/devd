const supertest = require("supertest");
const { Controllers } = require("../../database");
const StartApp = require("../../app.js");

const UserModel = require("../../models/User");
const ProjectModel = require("../../models/Project");
const PageModel = require("../../models/Page");
const ComponentModel = require("../../models/Components");
const RefreshTokenModel = require("../../models/RefreshToken.js");

const models = {
  UserModel,
  ProjectModel,
  PageModel,
  ComponentModel,
  RefreshTokenModel,
};

const superTestLogin = async (
  username = "coolguy",
  password = "coolguypassword"
) => {
  return supertest(StartApp(Controllers))
    .post("/auth/login")
    .send({ username, password })
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

  let testUser3 = new UserModel({
    username: "mrpink",
    email: "mypink@gmail.com",
  });
  testUser3.setPassword("mrpinkpassword");
  testUser3 = await testUser3.save();

  // Create testProject and make testUser owner of testProject1
  // Create testProject2 and make testUser2 the owner and testUser a guest
  const testProject = await Controllers.projectController.postNewProject(
    "Test project",
    "A project for testing",
    testUser._id
  );
  testUser.projects.push({ project_id: testProject._id, role: "admin" });

  const testProject2 = await Controllers.projectController.postNewProject(
    "Second Test project",
    "The second project used for testing",
    testUser2._id
  );
  testUser2.projects.push({ project_id: testProject2._id, role: "admin" });
  testUser.projects.push({ project_id: testProject2._id, role: "guest" });

  await testUser.save();
  await testUser2.save();

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
    name: "ButtonForTesting",
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

  const testComponent2 = new ComponentModel({
    name: "AnchorForTesting",
    description: "A reusable anchor component for various UI purposes.",
    snippet: "<a src='somesite.com' >Click me for more</a>",
    children: [],
    parents: [],
    images: [],
    project: testProject._id,
    date_created: Date.now(),
    visibility: "public",
  });
  await testComponent2.save();
  testPage.components.push(testComponent2._id);
  await testPage.save();
  testProject.components.push(testComponent2._id);
  await testProject.save();

  return {
    testProject,
    testProject2,
    testUser,
    testUser2,
    testUser3,
    testPage,
    testPage2,
    testComponent,
    testComponent2,
  };
};

module.exports = { clearDB, models, superTestLogin, seedDB };
