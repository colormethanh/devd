const logger = require("../utils/logging/logger");
const { ErrorMessages } = require("../utils/errorHelpers");
const { createResponseObject } = require("../utils/responseHelpers");

module.exports = errorRouter = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || ErrorMessages[statusCode];
  logger.error({
    message: `${message} - url:${req.url} - code:${statusCode}`,
    url: req.url,
  });
  return res
    .status(statusCode)
    .send(
      createResponseObject(
        { message: message, statusCode: statusCode },
        "Error"
      )
    );
};
