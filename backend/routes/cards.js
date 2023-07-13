const router = require('express').Router();

const {
  getCards, deleteCard, createCard, putLike, deleteLike,
} = require('../controllers/cards');

router.get(getCards);

router.delete('/cards/:cardId', deleteCard);

router.post('/cards', createCard);

router.put('/cards/:cardId/likes', putLike);

router.delete('/cards/:cardId/likes', deleteLike);

module.exports = router;
