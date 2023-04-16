const DataNotFoundError = require('../errors/DataNotFoundError');

module.exports = (req, res, next) => {
  next(new DataNotFoundError('Запрашиваемый адрес не найден.'));
};
