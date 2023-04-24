const {
  ERROR_ON_THE_SERVER,
} = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? ERROR_ON_THE_SERVER
        : message,
    });

  next();
};
