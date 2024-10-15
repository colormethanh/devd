const supertest = require("supertest");
const UserModel = require("../../models/User");
const ProjectModel = require("../../models/Project");

const models = { UserModel, ProjectModel };

const clearDocuments = async (model) => {
  try {
    await model.deleteMany({});
    console.log(`${model.modelName} documents cleared.`);
  } catch (err) {
    console.error(`Error clearing documents from ${model.modelName}:`, err);
  }
};

const superTestLogin = async (app, route, credentials) => {
  return await supertest(app()).post(route).send(credentials).expect(200);
};

module.exports = { clearDocuments, models, superTestLogin };
