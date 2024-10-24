const passport = require("passport");
const UserModel = require("../models/User");
const keys = require("../config/keys");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const jwt = require("jwt-simple");
const { createError } = require("../utils/errorHelpers");
const { createRefreshToken } = require("../controllers/refreshToken");
const logger = require("../utils/logging/logger");

const tokenForUser = (user) => {
  const timestamp = Math.round(Date.now() / 1000);
  return jwt.encode(
    {
      sub: user._id,
      iat: timestamp,
      exp: timestamp + 5 * 60, // expires in 5 minutes
    },
    keys.TOKEN_SECRET
  );
};

const refreshTokenForUser = async (user) => {
  try {
    logger.info(`Generating new token for user ${user._id}`);
    const payload = {
      sub: user._id,
      iat: Date.now(),
    };

    const token = jwt.encode(payload, keys.TOKEN_SECRET);

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const refreshToken = await createRefreshToken(user._id, token, expiresAt);

    return refreshToken;
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};

const tokenExtractor = (req) => {
  logger.info("Extracting token from header");
  const headers = req.headers;
  const authorization = headers.authorization;

  if (!authorization) {
    logger.error("Authorization header not found -- 401");
    return null;
  }
  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") return null;

  if (!token) {
    logger.error("Token not found -- 401");
    return null;
  }

  logger.info("Successfully extracted token");
  return token;
};

const jwtOptions = {
  jwtFromRequest: tokenExtractor,
  secretOrKey: keys.TOKEN_SECRET,
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    logger.info("Authenticating user token");
    const user = await UserModel.findById(payload.sub);
    if (user) {
      logger.info("User authenticated");
      done(null, user);
    } else {
      logger.error("Authentication failed");
      done(null, false);
    }
  } catch (err) {
    done(err, false);
  }
});

passport.use(jwtLogin);

module.exports = { tokenForUser, refreshTokenForUser };
