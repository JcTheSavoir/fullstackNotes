const express = require('express');
const router = express.Router();
const yugiohController = require('../controllers/yugiohController')

router.route('/')
    .get(yugiohController.fetchAllCards)
    .post(yugiohController.createCard)

router.route('/:id')
    .get(yugiohController.fetchCard)
    .put(yugiohController.updateCard)
    .delete(yugiohController.deleteCard);

module.exports = router;