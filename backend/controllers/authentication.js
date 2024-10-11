const jwt = require("jwt-simple");
const { UserModel } = require("../models/ModelsStore");
const keys = require("../config/keys");
const { checkIfUserExist } = require("../utils/authHelpers");

const tokenForUser = (user) => {
  const timestamp = Math.round(Date.now() / 1000);
  return jwt.encode(
    {
      sub: user._id,
      iat: timestamp,
      exp: timestamp + 5 * 60 * 60,
    },
    keys.TOKEN_SECRET
  );
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).send("Must provide username and password");

  try {
    const user = await UserModel.findOne({ username });

    // Check if user exists
    if (!user) return res.status(401).send("Invalid password or username");

    // Check if user's password matches
    const passwordValid = user.validatePassword(password);
    if (!passwordValid)
      return res.status(401).send("Invalid password or username");

    const token = tokenForUser(user);
    return res.send({ token: token });
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res
      .status(400)
      .send({ error: "You must provide an email, username, and password" });
  }

  try {
    // Check if the user already exists with the supplied credentials
    const userExists = await checkIfUserExist(UserModel, {
      email,
      username,
    });

    if (userExists)
      return res
        .status(409)
        .send({ error: "login credentials already in use" });

    const user = new UserModel();
    user.email = email;
    user.username = username;
    user.setPassword(password);
    await user.save();

    res.json({ token: tokenForUser(user) });
  } catch (err) {
    next(err);
  }
};
