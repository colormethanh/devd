const passport = require("passport");
const UserModel = require("../models/User");
const keys = require("../config/keys");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const jwt = require("jwt-simple");
const { createError } = require("../utils/errorHelpers");
const { createRefreshToken } = require("../controllers/refreshToken");
const logger = require("../utils/logging/logger");

const tokenForUser = (user, expirationInMinutes = 5) => {
  const timestamp = Math.round(Date.now() / 1000);
  return jwt.encode(
    {
      sub: user._id,
      iat: timestamp,
      exp: timestamp + expirationInMinutes * 60, // expires in 5 minutes
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
  logger.info({
    message: "Extracting token from header",
    request_id: req.metadata.request_id,
  });
  const headers = req.headers;
  const authorization = headers.authorization;

  if (!authorization) {
    logger.error({
      message: "Authorization header not found -- 401",
      request_id: req.metadata.request_id,
    });
    return null;
  }
  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") return null;

  if (!token) {
    logger.error({
      message: "Token not found -- 401",
      request_id: req.metadata.request_id,
    });
    return null;
  }

  logger.info({
    message: "Successfully extracted token, sending to JWT middleware",
    request_id: req.metadata.request_id,
  });
  req.token = token;
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
    // todo: I can't find where this error happens!!
    if (err.name === "TokenExpiredError") {
      logger.warn(`Token expired at ${payload.exp} --- Unauthorized`);
      return done(null, false);
    }

    logger.error(`JWT Error: ${err.message}`);
    done(err, false);
  }
});

passport.use(jwtLogin);

module.exports = { tokenForUser, refreshTokenForUser };
