const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const limiter = require('./utils/limiter');

const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const router = require('./routes');

const { PORT_CONFIG, DB_CONFIG } = require('./utils/config');

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect(DB_CONFIG);

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT_CONFIG, () => {
  console.log(`App listening on port ${PORT_CONFIG}`);
});
