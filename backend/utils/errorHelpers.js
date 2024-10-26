const logger = require("./logging/logger");

const createError = (statusCode = 500, message = "") => {
  const error = Error(message);
  error.statusCode = statusCode;
  return error;
};

const ErrorMessages = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  406: "Not Acceptable",
  500: "Internal Server Error",
  501: "Not Implemented",
};

module.exports = { createError, ErrorMessages };
