const RefreshTokenModel = require("../models/RefreshToken");
const { createError } = require("../utils/errorHelpers");

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

exports.deleteRefreshToken = async (token) => {
  try {
    const deleteResponse = await RefreshTokenModel.findOneAndDelete({
      _id: token._id,
    });

    return deleteResponse;
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};

exports.getRefreshToken = async (token) => {
  try {
    const refreshToken = await RefreshTokenModel.findOne({ token: token });

    if (!refreshToken) return null;

    const isExpired = refreshToken.expiresAt < Date.now();

    if (isExpired) return null;

    return refreshToken;
  } catch (err) {
    return createError(err.statusCode, err.message);
  }
};
