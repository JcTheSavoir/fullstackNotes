// Schema: we create a blueprint for the model so we can export that 
// format to our express server and eventually link it to your routes {CRUD operations}.
const mongoose = require('mongoose');
const nikeSchema = new mongoose.Schema({
    model: String,
    sub_Model: String,
    release_Year: String,
})
const Nike = mongoose.model("Nike", nikeSchema);

module.exports = Nike;