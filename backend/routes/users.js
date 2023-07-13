const router = require('express').Router();

const {
  getUsers, getUserById, updateUserData, updateUserAvatar, getMyData, logout,
} = require('../controllers/users');

router.get('/users/me', getMyData);

router.patch('/users/me', updateUserData);

router.patch('/users/me/avatar', updateUserAvatar);

router.get('/', getUsers);

router.get('/users/:userId', getUserById);

router.get('/signout', logout);

module.exports = router;
