const response = (res, status, message, data = null) => {
  res.status(status).json({
    success: status >= 200 && status < 300,
    message,
    data,
  });
};

module.exports = response;
