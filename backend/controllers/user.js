const UserModel = require("../models/User");
const { createError } = require("../utils/errorHelpers");

exports.getUser = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    if (!user) return createError("User could not be found", 404);
    return user;
  } catch (err) {
    throw Error(err);
  }
};
