const { celebrate, Joi } = require('celebrate');
const { isValidObjectId } = require('mongoose');

const {
  URL_PATTERN,
} = require('./constants');

const customValidationObjectId = (id, helpers) => {
  if (!isValidObjectId(id)) {
    return helpers.error('id.invalid');
  }

  return id;
};

const validationSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationUpdateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validationCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(URL_PATTERN),
    trailerLink: Joi.string().required().pattern(URL_PATTERN),
    thumbnail: Joi.string().required().pattern(URL_PATTERN),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validationParamsControllersMovies = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().custom(customValidationObjectId, 'custom objectId validation'),
  }),
});

module.exports = {
  validationSignup,
  validationSignin,
  validationUpdateUserProfile,
  validationCreateMovie,
  validationParamsControllersMovies,
};
