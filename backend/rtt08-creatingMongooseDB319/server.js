require("dotenv").config()
// --------------> allows the {.env} file
const express = require("express");
const app = express()
const PORT = process.env.PORT || 3000
const connectToDb = require("./config/connectToDb")
// This pulls our Mongoose connection into application
const cors = require("cors"); 
// ------------- Recieving reqs on cross-origins **
app.use(express.json())
// Express doesn"t naturally convert our data to json
app.use(cors())
connectToDb()
// This initializes our connectToDb() function
// ------------------------------------------------------reQs
const noteRoute = require('./routes/note')
const yugiohRoute = require('./routes/yugioh')
const nikeRoute = require('./routes/nike')
// -----------------------------------------------------ROUTING
//We want to establish CRUD routes for our Notes Model-->
//---{IMPORTANT}, every MODEL needs it's own Routes that include CREATE, Read, Update and Delete---{IMPORTANT}
// ------------------------------------------------CREATE
// ------------------------------------------------READ
// ------------------------------------------------UPDATE
// ------------------------------------------------DELETE

app.get("/", (req, res) => {
    res.send("This is a Landing Page")
})
//We want to establish CRUD routes for our Notes Model--> 
    // app.get("/notes", notesController.fetchAllNotes)
    // //-----------------------------------------------------------------> GET all Notes -- [READ / GET]
    // app.get("/notes/:id", notesController.fetchNote)
    // // -------------------------------------------------------> GET a Specific Note by ID - [READ / GET]
    // app.post("/notes", notesController.createNote);
    // // ------------------------------------------------------------> Create a Note - [CREATE / POST] 
    // app.put("/notes/:id", notesController.updateNote);
    // //-----------------------------------------------------------> Update a Specific Note - [UPDATE]
    // app.delete("/notes/:id", notesController.deleteNote);
    // //-------------------------------------------------------------> Delete a specific Note - [DELETE]
    // // - -  - - - - -  - - - - - - - ---  -- - - - - - -  - - - - - - - -
// ALL OF THE ROUTES WERE PUT INTO A ROUTES DIRECTORY INSTEAD, so now just use the line
//of code below this comment.
app.use('/notes', noteRoute)
//We want to establish CRUD routes for our Yugioh Model
app.use('/yugioh', yugiohRoute)
//We want to establish CRUD routes for our Nike Model
app.use('/nike', nikeRoute)


app.listen(PORT, ()=>{
    console.log(`Express Server Listending on port num: ${PORT}`)
});
//---------------------------------Server