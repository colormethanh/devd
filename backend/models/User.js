const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

const UserSchema = new Schema({
  username: { type: String, required: true },
  salt: { type: String, required: true },
  hash: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  projects: [
    {
      project_id: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
      },
      role: {
        type: String,
        enum: ["admin", "guest"],
        required: true,
      },
    },
  ],
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this;
};

UserSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");

  return this.hash === hash;
};

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
