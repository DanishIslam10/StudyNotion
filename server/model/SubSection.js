const mongoose = require('mongoose')
const Section = require("./Section")

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
    duration : {
        type:Number,
        required:true,
    },
    section : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section", // Referencing the Section model
        required: true
    },
    course : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required: true 
    }
})

module.exports = mongoose.model("SubSection", subSectionSchema)