const mongoose = require('mongoose')

const sectionSchema = new mongoose.Schema({
    sectionName:{
        type:String,
        required:true,
    },
    totalDuration:{
        type:Number,
        default:0,
    },
    course: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Course",
      required:true
    },
    subSection: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection",
    }]
})

module.exports = mongoose.model("Section",sectionSchema)