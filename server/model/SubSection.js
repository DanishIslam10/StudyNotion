const mongoose = require('mongoose')

const subSectionSchema = new mongoose.Schema({
    videoUrl: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    timeDuration: {
        type: String
    },
    section : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section", // Referencing the Section model
        required: true
    }
})

module.exports = mongoose.model("SubSection", subSectionSchema)