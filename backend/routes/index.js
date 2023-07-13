const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { logout } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

router.use(auth);

router.get('/signout', logout);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

module.exports = router;
