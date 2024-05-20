// THIS FILE IS: Responsible for connecting the Mongoose db to the express server application
require("dotenv").config()

const mongoose = require("mongoose")

const connectToDb = async () => {
    await mongoose.connect(process.env.DB_URL)
// -> This is hwo the app connects to our database
    console.log("Currently Connected to MongoDB Cluster")
}
module.exports = connectToDb