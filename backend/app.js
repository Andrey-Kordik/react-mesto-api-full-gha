const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const { PORT = 3000 } = process.env;

app.disable('x-powered-by');

app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.json());

app.use(cors({
  origin: true,
  credentials: true,
}));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb').then(() => {
  console.log('connected to MongoDB');
});

app.use(requestLogger);

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use('/', userRoutes);
app.use('/', cardRoutes);

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
