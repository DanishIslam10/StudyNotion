const mongoose = require('mongoose')

const courseProgressSchema = new mongoose.Schema({
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    //completed video will be an array of videos
    // a single video is a 'SubSection' schema
    completedVideos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubSection"
        }
    ]
})

module.exports = mongoose.model("CourseProgress", courseProgressSchema)