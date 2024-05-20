const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController')

router.route('/')
    .get(notesController.fetchAllNotes)
    .post(notesController.createNote)

router.route('/:id')
    .get(notesController.fetchNote)
    .put(notesController.updateNote)
    .delete(notesController.deleteNote);

module.exports = router;