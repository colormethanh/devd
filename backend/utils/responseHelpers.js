const createResponseObject = (payload, message = "Success") => {
  const response = {
    message: message,
    payload: payload,
  };

  return response;
};

module.exports = { createResponseObject };
