const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');

const app = express();

const { PORT = 3000 } = process.env;

app.disable('x-powered-by');

app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb').then(() => {
  console.log('connected to MongoDB');
});

app.use(cors({
  origin: 'https://domain.kordik.nomoreparties.sbs',
  credentials: true,
}));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
