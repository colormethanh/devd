const UserModel = require("../models/User");
const { createError } = require("../utils/errorHelpers");

exports.getUser = async (userId) => {
  try {
    const user = await UserModel.findById(userId).populate({
      path: "projects.project_id",
    });
    if (!user) return createError(404, "User could not be found");
    return user;
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};
