const router = require('express').Router();

const {
  getUsers, getUserById, updateUserData, updateUserAvatar, getMyData, logout,
} = require('../controllers/users');

router.get('//me', getMyData);

router.patch('//me', updateUserData);

router.patch('//me/avatar', updateUserAvatar);

router.get('/', getUsers);

router.get('//:userId', getUserById);

router.get('/signout', logout);

module.exports = router;
