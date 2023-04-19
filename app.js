const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

require('dotenv').config();

const { validationSignup, validationSignin } = require('./utils/validation');
const limiter = require('./utils/limiter');

const { createUser, login } = require('./controllers/users');

const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const pageNotFound = require('./middlewares/pageNotFound');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);

app.post('/signin', validationSignin, login);
app.post('/signup', validationSignup, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.use('*', pageNotFound);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
