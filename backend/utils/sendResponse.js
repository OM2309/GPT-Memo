const sendResponse = (res, statusCode, message, data) => {
  const responseCode = statusCode || 200;
  const responseMessage = message || "Api executed successfully";
  const responseData = data || [];

  return res
    .status(responseCode)
    .json({ status: true, message: responseMessage, data: responseData });
};

module.exports = sendResponse;
