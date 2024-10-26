const UserModel = require("./User");
const ProjectModel = require("./Project");
const PageModel = require("./Page");
const ComponentModel = require("./Components");
const RefreshTokenModel = require("./RefreshToken.js");

const models = {
  UserModel,
  ProjectModel,
  PageModel,
  ComponentModel,
  RefreshTokenModel,
};

modules.exports = models;
