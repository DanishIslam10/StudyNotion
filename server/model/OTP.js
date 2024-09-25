const mongoose = require('mongoose')
const mailSender = require('../utils/mailSender')

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60
    }
})

async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(email, "Verification Email", otp)
        console.log("Verification Email sent successfully : ", mailResponse)
    } catch (error) {
        console.log("Error in sending Verification Email")
        console.log(error)
    }
}

// this is a pre middleware
// whenever a new otp get saved into the db inside OTP schema , a mail will be sent before that
OTPSchema.pre("save",async function(next) {
    await sendVerificationEmail(this.email,this.otp);
    next()
})

module.exports = mongoose.model("OTP", OTPSchema)