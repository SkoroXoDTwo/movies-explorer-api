const Movie = require('../models/movie');
const DataNotFoundError = require('../errors/DataNotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate(['owner'])
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const { _id } = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: _id,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при создании фильма.'));
      }

      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id } = req.user;

  console.log(movieId);

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return next(new DataNotFoundError('Фильм с указанным _id не найден.'));
      }
      if (_id !== movie.owner.toString()) {
        return next(new ForbiddenError('Недостаточно прав'));
      }

      movie.remove()
        .then(() => res.send({ data: movie }))
        .catch(next);
    })
    .catch(next);
};
