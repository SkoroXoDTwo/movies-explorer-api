const router = require('express').Router();
const { validationUpdateUserProfile } = require('../utils/validation');

const {
  getUserMe, updateUserProfile,
} = require('../controllers/users');

router.get('/me', getUserMe);

router.patch('/me', validationUpdateUserProfile, updateUserProfile);

module.exports = router;
