const UserModel = require("../models/User");
const { checkIfUserExist } = require("../utils/authHelpers");
const { createError } = require("../utils/errorHelpers");
const { tokenForUser, refreshTokenForUser } = require("../services/passport");

exports.login = async (username, password) => {
  try {
    const user = await UserModel.findOne({ username });

    if (!user) return createError(401, "Incorrect username or password");

    const passwordValid = user.validatePassword(password);

    if (!passwordValid)
      return createError(401, "Incorrect username or password");

    const accessToken = tokenForUser(user);
    const refreshToken = await refreshTokenForUser(user);

    return { accessToken, refreshToken };
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};

// Is this is security risk?
exports.signupAndGetId = async (email, username, password) => {
  try {
    const userExists = await checkIfUserExist(UserModel, {
      email,
      username,
    });

    if (userExists) {
      return createError(400, "Username or email already taken");
    }

    const user = new UserModel();
    user.email = email;
    user.username = username;
    user.setPassword(password);
    await user.save();

    return user._id;
  } catch (err) {
    throw createError(err.statusCode, err.message);
  }
};

exports.signup = async (email, username, password) => {
  try {
    if (!email || !username || !password)
      return createError(400, "Email, Username, and Password are required");

    const userExists = await checkIfUserExist(UserModel, {
      email,
      username,
    });

    if (userExists) {
      return createError(400, "Username or email already taken");
    }

    const user = new UserModel();
    user.email = email;
    user.username = username;
    user.setPassword(password);
    await user.save();

    const accessToken = tokenForUser(user);
    const refreshToken = await refreshTokenForUser(user);

    return { accessToken, refreshToken, user_id: user._id };
  } catch (err) {
    throw createError(err.statusCode, err.message);
  }
};
