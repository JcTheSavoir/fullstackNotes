// Schema: we create a blueprint for the model so we can export that 
// format to our express server and eventually link it to your routes {CRUD operations}.

const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    title: String,
    body: String,
})
const Note = mongoose.model("Note", noteSchema);

module.exports = Note;