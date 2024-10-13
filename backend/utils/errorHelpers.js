const createError = (message, statusCode) => {
  const error = Error(message);
  error.statusCode = statusCode;
  return error;
};

module.exports = { createError };
