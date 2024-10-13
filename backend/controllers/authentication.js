const jwt = require("jwt-simple");
const UserModel = require("../models/User");
const keys = require("../config/keys");
const { checkIfUserExist } = require("../utils/authHelpers");
const { createError } = require("../utils/errorHelpers");

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
    const passwordValid = user.validatePassword(password);

    if (!passwordValid || !user)
      return createError("Incorrect username or password", 400);

    return tokenForUser(user);
  } catch (err) {
    throw Error(err);
  }
};

exports.signup = async (email, username, password) => {
  try {
    const userExists = await checkIfUserExist(UserModel, {
      email,
      username,
    });

    if (userExists) {
      return createError("Username or email already taken", 400);
    }

    const user = new UserModel();
    user.email = email;
    user.username = username;
    user.setPassword(password);
    await user.save();

    return tokenForUser(user);
  } catch (err) {
    throw Error(err);
  }
};
