const router = require('express').Router();

const auth = require('../middlewares/auth');
const { validationSignup, validationSignin } = require('../utils/validation');
const { createUser, login } = require('../controllers/users');
const pageNotFound = require('../middlewares/pageNotFound');

router.post('/signin', validationSignin, login);
router.post('/signup', validationSignup, createUser);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('*', pageNotFound);

module.exports = router;
