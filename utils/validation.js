const { celebrate, Joi } = require('celebrate');
const { isValidObjectId } = require('mongoose');

const customValidationObjectId = (id, helpers) => {
  if (!isValidObjectId(id)) {
    return helpers.error('id.invalid');
  }

  return id;
};
const urlPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;

const validationSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validationSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validationUpdateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validationCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlPattern),
    trailerLink: Joi.string().required().pattern(urlPattern),
    thumbnail: Joi.string().required().pattern(urlPattern),
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
