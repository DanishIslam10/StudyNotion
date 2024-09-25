const mongoose = require('mongoose')
require("dotenv").config

exports.connectDB = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log("DB connected successfully")
        })
        .catch((error) => {
            console.log("Error in DB connection")
            console.log(error)
            process.exit(1)
        })
}