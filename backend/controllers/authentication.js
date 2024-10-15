const jwt = require("jwt-simple");
const UserModel = require("../models/User");
const keys = require("../config/keys");
const { checkIfUserExist } = require("../utils/authHelpers");
const { createError } = require("../utils/errorHelpers");
const { CreateResponseObject } = require("../utils/responseHelpers");

const tokenForUser = (user) => {
  const timestamp = Math.round(Date.now() / 1000);
  return jwt.encode(
    {
      sub: user._id,
      iat: timestamp,
      exp: timestamp + 5 * 60 * 60, // expires in 5 hours
    },
    keys.TOKEN_SECRET
  );
};

exports.login = async (username, password) => {
  try {
    const user = await UserModel.findOne({ username });

    if (!user) return createError(401, "Incorrect username or password");

    const passwordValid = user.validatePassword(password);

    if (!passwordValid)
      return createError(401, "Incorrect username or password");

    return tokenForUser(user);
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

    return tokenForUser(user);
  } catch (err) {
    throw createError(err.statusCode, err.message);
  }
};
