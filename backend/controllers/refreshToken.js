const RefreshTokenModel = require("../models/RefreshToken");

exports.createRefreshToken = async (user_id, token, expiresAt) => {
  try {
    const refreshToken = await RefreshTokenModel.create({
      user_id,
      token,
      expiresAt,
    });

    return refreshToken;
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};

exports.getRefreshToken = async (token) => {
  try {
    const refreshToken = await RefreshTokenModel.findOne({ token: token });

    return refreshToken;
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};
