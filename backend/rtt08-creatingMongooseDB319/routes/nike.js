const express = require('express');
const router = express.Router();
const nikeController = require('../controllers/nikeController')

router.route('/')
    .get(nikeController.fetchAllNikes)
    .post(nikeController.createNike)

router.route('/:id')
    .get(nikeController.fetchNike)
    .put(nikeController.updateNike)
    .delete(nikeController.deleteNike);

module.exports = router;