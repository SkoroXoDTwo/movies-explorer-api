const router = require('express').Router();
const { validationCreateMovie } = require('../utils/validation');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', validationCreateMovie, createMovie);

router.post('/:movieId', validationCreateMovie, deleteMovie);

module.exports = router;
