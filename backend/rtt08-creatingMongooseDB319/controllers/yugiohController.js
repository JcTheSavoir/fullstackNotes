const Yugioh = require('../models/yugioh')
const fetchAllCards = async(req, res)=>{  //READ
    // 1. Get all Yugioh Cards from DB
    // 2. Send the Yugioh Cards back as a response
    const yugiohCards = await Yugioh.find();
    // ------------------------(1)
    res.json({yugiohCards: yugiohCards})
    // ------------------------(2)
}

const fetchCard = async(req, res)=>{  //READ
    // 1. Get id off the url (req parameter)
    // 2. Find the Card associated with "id"
    // 3. Send response with that Card as the payload

    const yugiohCardId = req.params.id
    // ------------------------(1)
    const yugiohCard = await Yugioh.findById(yugiohCardId);
    // ------------------------(2)
    res.json({ yugiohCard: yugiohCard })
    // ------------------------(3)
}

const createCard = async(req, res) => {   //CREATE
    // 1. Get data from req.body 
    // 2. Create Card
    // 3. Respond with new copy of Card
console.log(`BODY: ${req.body}`)

const name = req.body.name
const type = req.body.type
const subType = req.body.subType
const release_Year = req.body.release_Year
// const {name, type, subType, release_Year} = req.body  (Industry standard way to do the above two lines)
    // ------------------------(1)
const yugiohCard = await Yugioh.create({
    name: name,
    type: type,
    subType: subType,
    release_Year: release_Year,
});
    console.log(yugiohCard)
    // ------------------------(2)
res.json({yugiohCard: yugiohCard});
    // ------------------------(3)
}

const updateCard =  async(req, res) => {  //UPDATE
    // 1. Get id off the url
    // 2. Get the data off the id
    // 3. Find and Update Card
    // 4. Retrieve updateCard and sent it as a response
    const yugiohCardId = req.params.id
        // ------------------------^(1)
    const {name, type, subType, release_Year} = req.body
        // ------------------------^(2)
    const yugiohCard = await Yugioh.findByIdAndUpdate(yugiohCardId, {
        name: name,
        type: type,
        subType: subType,
        release_Year: release_Year,
    });
    const updatedCard = await Yugioh.findById(yugiohCardId);
    res.json({ yugiohCard: updatedCard });
        // ------------------------^(3)
        // ------------------------^(4)
}

const deleteCard = async(req, res) => { //DELETE
    // 1. Get the id off the url
    // 2. Delete the record
    // 3. Send Response
    const yugiohCardId = req.params.id
    // ------------------------^(1)
    const cardDelete = await Yugioh.findByIdAndDelete(yugiohCardId)
    // ------------------------^(2)
    res.json({success: "Record has been deleted successfully" })
    // ------------------------^(3)
}


module.exports = {
    fetchAllCards,
    fetchCard,
    createCard,
    updateCard,
    deleteCard
}