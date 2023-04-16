const { celebrate, Joi } = require('celebrate');
const { isValidObjectId } = require('mongoose');

const customValidationObjectId = (id, helpers) => {
  if (!isValidObjectId(id)) {
    return helpers.error('id.invalid');
  }

  return id;
};

const validationSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/),
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
    about: Joi.string().min(2).max(30),
  }),
});

const validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/),
  }),
});

const validationParamsControllersCards = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().custom(customValidationObjectId, 'custom objectId validation'),
  }),
});

module.exports = {
  validationSignup,
  validationSignin,
  validationUpdateUserProfile,
  validationCreateCard,
  validationParamsControllersCards,
};
