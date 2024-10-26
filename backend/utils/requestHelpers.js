// checks to see if request body has at least on of the provided features
module.exports.hasOne = (features, body) => {
  let hasOne = false;
  features.forEach((feature) => {
    if (body[feature] && body[feature] !== undefined) hasOne = true;
  });

  return hasOne;
};

module.exports.fillObjectWithFromBody = (features, body, original) => {
  const filledObject = {};

  features.forEach((feature) => {
    if (body[feature] !== undefined && !Array.isArray(body[feature])) {
      filledObject[feature] = body[feature];
    }

    if (body[feature] !== undefined && Array.isArray(body[feature])) {
      filledObject[feature] = body[feature].concat(original[feature]);
    }
  });

  return filledObject;
};
