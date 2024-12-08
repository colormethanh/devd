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

exports.updateUser = async (user_id, updates) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      user_id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    return updatedUser;
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};
