const {
  REQUESTED_ADDRESS_NOT_FOUND,
} = require('../utils/constants');

const DataNotFoundError = require('../errors/DataNotFoundError');

module.exports = (req, res, next) => {
  next(new DataNotFoundError(REQUESTED_ADDRESS_NOT_FOUND));
};
