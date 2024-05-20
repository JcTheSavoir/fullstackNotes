const Nike = require('../models/nike')
const fetchAllNikes = async(req, res)=>{  //READ
    // 1. Get all Nikes from DB
    // 2. Send the Nikes back as a response
    const nikes = await Nike.find();
    // ------------------------(1)
    res.json({nikes: nikes})
    // ------------------------(2)
}

const fetchNike = async(req, res)=>{  //READ
    // 1. Get id off the url (req parameter)
    // 2. Find the Nike associated with "id"
    // 3. Send response with that Nike as the payload

    const nikeId = req.params.id
    // ------------------------(1)
    const nike = await Nike.findById(nikeId);
    // ------------------------(2)
    res.json({ nike: nike })
    // ------------------------(3)
}

const createNike = async(req, res) => {   //CREATE
    // 1. Get data from req.body 
    // 2. Create Nike
    // 3. Respond with new copy of Nike
console.log(`BODY: ${req.body}`)

const model = req.body.model
const sub_Model = req.body.sub_Model
const release_Year = req.body.release_Year
// const {model, sub_Model, release_Year} = req.body  (Industry standard way to do the above two lines)
    // ------------------------(1)
const nike = await Nike.create({
    model: model,
    sub_Model: sub_Model,     
    release_Year: release_Year,
});
    console.log(nike)
    // ------------------------(2)
res.json({nike: nike});
    // ------------------------(3)
}

const updateNike =  async(req, res) => {  //UPDATE
    // 1. Get id off the url
    // 2. Get the data off the id
    // 3. Find and Update Nike
    // 4. Retrieve updateNike and sent it as a response
    const nikeId = req.params.id
        // ------------------------^(1)
    const {model, sub_Model, release_Year} = req.body
        // ------------------------^(2)
    const nike = await Nike.findByIdAndUpdate(nikeId, {
        model: model,
        sub_Model: sub_Model,
        release_Year: release_Year,
    });
    const updatedNike = await Nike.findById(nikeId);
    res.json({ nike: updatedNike });
        // ------------------------^(3)
        // ------------------------^(4)
}

const deleteNike = async(req, res) => { //DELETE
    // 1. Get the id off the url
    // 2. Delete the record
    // 3. Send Response
    const nikeId = req.params.id
    // ------------------------^(1)
    const cardDelete = await Nike.findByIdAndDelete(nikeId)
    // ------------------------^(2)
    res.json({success: "Record has been deleted successfully" })
    // ------------------------^(3)
}


module.exports = {
    fetchAllNikes,
    fetchNike,
    createNike,
    updateNike,
    deleteNike
}