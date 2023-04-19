const router = require('express').Router();
const { validationCreateMovie, validationParamsControllersMovies } = require('../utils/validation');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', validationCreateMovie, createMovie);

router.delete('/:movieId', validationParamsControllersMovies, deleteMovie);

module.exports = router;
