const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_SECRET_CONFIG } = require('../utils/config');

const {
  INVALID_TOKEN,
} = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(INVALID_TOKEN));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET_CONFIG);
  } catch (err) {
    return next(new UnauthorizedError(INVALID_TOKEN));
  }

  req.user = payload;
  next();
};
