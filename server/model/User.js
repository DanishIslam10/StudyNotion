const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        enum: ["Student", "Instructor", "Admin"],
        required: true
    },
    //these additional details refers to the 'Profile' model
    //these details will be asked after the user has signed up
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    },
    //this courses object refers to the "Course" model
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ],
    image: {
        type: String, //type is string because it will be a url
       
    },
    // 'token' and 'resetPasswordExpired' properties are added in user model to reset the password
    // 'token' will be used in generating a unique UI link corresponding to that user
    // 'resetPasswordExpires' defines that when should the unique UI link be expired
    token: {
        type: String,
        expires : 5 * 60,
    },
    resetPasswordExpires: {
        type: Date,
    },
    //courseProgress will be an array which tracks the progress of the course
    courseProgress: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseProgress"
        }
    ]
})

module.exports = mongoose.model("User", userSchema)