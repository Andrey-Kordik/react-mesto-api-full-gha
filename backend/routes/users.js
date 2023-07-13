const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

const {
  getUsers, getUserById, updateUserData, updateUserAvatar, getMyData, logout,
} = require('../controllers/users');

router.get('/users/me', getMyData);

router.patch('/users/me', updateUserData);

router.patch('/users/me/avatar', updateUserAvatar);

router.get('/users', getUsers);

router.get('/users/:userId', getUserById);

router.get('/signout', logout);

router.use((req, res, next) => next(new NotFoundError('Страницы по запрошенному URL не существует')));

module.exports = router;
