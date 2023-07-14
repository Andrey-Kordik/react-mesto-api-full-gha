const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { createUser, login, logout } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.post('/signin', login);
router.post('/signup', createUser);

router.use(auth);
router.get('/signout', logout);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use((req, res, next) => {
  const error = new NotFoundError('Страница не найдена');
  next(error);
});

module.exports = router;
