const passport = require("passport");
const UserModel = require("../models/User");
const keys = require("../config/keys");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const jwt = require("jwt-simple");
const { createError } = require("../utils/errorHelpers");
const { createRefreshToken } = require("../controllers/refreshToken");

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

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.TOKEN_SECRET,
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await UserModel.findById(payload.sub);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err, false);
  }
});

passport.use(jwtLogin);

module.exports = { tokenForUser, refreshTokenForUser };
