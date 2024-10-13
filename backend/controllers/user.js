const UserModel = require("../models/User");

exports.getUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.send(user);
  } catch (err) {
    next(err);
  }
};
