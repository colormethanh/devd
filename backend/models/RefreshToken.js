const mongoose = require("mongoose");

const RefreshTokenSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true, index: { expires: "1d" } },
});

const RefreshTokenModel = mongoose.model("RefreshToken", RefreshTokenSchema);
module.exports = RefreshTokenModel;
