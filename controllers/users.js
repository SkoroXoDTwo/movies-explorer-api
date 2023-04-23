const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET_CONFIG } = require('../utils/config');

const User = require('../models/user');
const DataNotFoundError = require('../errors/DataNotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const {
  USER_NOT_FOUND,
  EMAIL_ALREADY_REGISTERED,
  INCORRECT_DATA_UPDATE_USER_INFO,
  INCORRECT_DATA_CREATE_USER,
  TOKEN_LIFETIME,
} = require('../utils/constants');

module.exports.getUserMe = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        return next(new DataNotFoundError(USER_NOT_FOUND));
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateUserProfile = (req, res, next) => {
  const { email, name } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        return next(new DataNotFoundError(USER_NOT_FOUND));
      }

      res.send({ data: user });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(EMAIL_ALREADY_REGISTERED));
      }

      if (err.name === 'ValidationError') {
        return next(new BadRequestError(INCORRECT_DATA_UPDATE_USER_INFO));
      }

      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;

      res.send({ data: userData });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(EMAIL_ALREADY_REGISTERED));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(INCORRECT_DATA_CREATE_USER));
      }

      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET_CONFIG,
        { expiresIn: TOKEN_LIFETIME },
      );

      res.send({ token });
    })
    .catch(next);
};
