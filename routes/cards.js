const router = require('express').Router();
const { validationCreateCard, validationParamsControllersCards } = require('../utils/validation');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', validationCreateCard, createCard);

router.delete('/:cardId', validationParamsControllersCards, deleteCard);

router.put('/:cardId/likes', validationParamsControllersCards, likeCard);

router.delete('/:cardId/likes', validationParamsControllersCards, dislikeCard);

module.exports = router;
