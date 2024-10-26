const logger = require("./logging/logger");

const createResponseObject = (payload, message = "Success") => {
  if (message !== "Error") logger.info(message);
  const response = {
    message: message,
    payload: payload,
  };

  return response;
};

module.exports = { createResponseObject };
