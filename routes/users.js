const router = require('express').Router();
const { validationUpdateUserProfile, validationGetUser, validationUpdateUserAvatar } = require('../utils/validation');

const {
  getUsers, getUser, updateUserProfile, updateUserAvatar, getUserMe,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getUserMe);

router.get('/:userId', validationGetUser, getUser);

router.patch('/me', validationUpdateUserProfile, updateUserProfile);

router.patch('/me/avatar', validationUpdateUserAvatar, updateUserAvatar);

module.exports = router;
