const Note = require('../models/note')
const fetchAllNotes = async(req, res)=>{  //READ
    // 1. Get all Notes from DB
    // 2. Send the Notes back as a response
    const notes = await Note.find();
    // ------------------------(1)
    res.json({notes: notes})
    // ------------------------(2)
}

const fetchNote = async(req, res)=>{  //READ
    // 1. Get id off the url (req parameter)
    // 2. Find the note associated with "id"
    // 3. Send response with that note as the payload

    const noteId = req.params.id
    // ------------------------(1)
    const note = await Note.findById(noteId);
    // ------------------------(2)
    res.json({ note: note })
    // ------------------------(3)
}

const createNote = async(req, res) => {   //CREATE
    // 1. Get data from req.body 
    // 2. Create note
    // 3. Respond with new copy of Note
console.log(`BODY: ${req.body}`)

const title = req.body.title
const body = req.body.body
// const {title, body} = req.body  (Industry standard way to do the above two lines)
    // ------------------------(1)
const note = await Note.create({
    title: title,
    body: body,
});
    // ------------------------(2)
res.json({note: note});
    // ------------------------(3)
}

const updateNote =  async(req, res) => {  //UPDATE
    // 1. Get id off the url
    // 2. Get the data off the id
    // 3. Find and Update Note
    // 4. Retrieve updatedNote and sent it as a response
    const noteId = req.params.id
        // ------------------------^(1)
    const {title, body} = req.body
        // ------------------------^(2)
    const note = await Note.findByIdAndUpdate(noteId, {
        title: title,
        body: body,
    });
    const updatedNote = await Note.findById(noteId);
    res.json({ note: updatedNote });
        // ------------------------^(3)
        // ------------------------^(4)
}

const deleteNote = async(req, res) => { //DELETE
    // 1. Get the id off the url
    // 2. Delete the record
    // 3. Send Response
    const noteId = req.params.id
    // ------------------------^(1)
    const noteDelete = await Note.findByIdAndDelete(noteId)
    // ------------------------^(2)
    res.json({success: "Record has been deleted successfully" })
    // ------------------------^(3)
}


module.exports = {
    fetchAllNotes,
    fetchNote,
    createNote,
    updateNote,
    deleteNote
}