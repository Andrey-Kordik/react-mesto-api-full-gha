const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

const {
  getCards, deleteCard, createCard, putLike, deleteLike,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.delete('/cards/:cardId', deleteCard);

router.post('/cards', createCard);

router.put('/cards/:cardId/likes', putLike);

router.delete('/cards/:cardId/likes', deleteLike);

router.use((req, res, next) => next(new NotFoundError('Страницы по запрошенному URL не существует')));

module.exports = router;
