// Schema: we create a blueprint for the model so we can export that 
// format to our express server and eventually link it to your routes {CRUD operations}.

const mongoose = require('mongoose');
const yugiohSchema = new mongoose.Schema({
    name: String,
    type: String,
    subType: String,
    release_Year: String,
})
const Yugioh = mongoose.model("Yugioh", yugiohSchema);

module.exports = Yugioh;