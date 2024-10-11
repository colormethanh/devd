exports.checkIfUserExist = async (userModel, userInfo) => {
  const checks = Object.keys(userInfo).map((property) =>
    userModel.findOne({ [property]: userInfo[property] })
  );

  // Concurrently run all the checks
  const results = await Promise.all(checks);

  // If any of the check are non-null then a user exists
  // todo: Make it so that it returns the info that is already taken
  return results.some((result) => result !== null);
};
