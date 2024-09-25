const { instance } = require('../config/razorpay')
const Course = require('../model/Course')
const User = require('../model/User')
const mailSender = require('../utils/mailSender')
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail')
const mongoose = require('mongoose')
const crypto = require('crypto')
require("dotenv").config()

//capture the payment and initialte the Razorpay order
exports.capturePayment = async (req, res) => {
    try {
        //get courseId and userId (who is the user and what course is he buying)
        const { courseId } = req.body
        const userId = req.user.id
        //apply validation on courseId
        if (!courseId) {
            return res.status(404).json({
                success: false,
                message: "please provide valid course id"
            })
        }
        //apply validation on userId
        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "please provide a valid user id"
            })
        }
        //apply validation on course details
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "please provide valid course details"
            })
        }
        //check if user is already enrolled in the course

        //userID fetched from the req.user is of String type , but studentsEnrolled is of objectId type
        //so in order to compare both, we need to first convert the type of userId from String to objectId
        const uid = new mongoose.Types.ObjectId(userId)
        if (course.studentsEnrolled.includes(uid)) {
            return res.status(400).json({
                success: false,
                message: "Student is already enrolled in this course"
            })
        }

        //now create order through razorpay instance

        //amount and currency is mendatory to create an razorpay order
        const amount = course.price
        const currency = "INR"

        //creating payload for razorpay order
        const options = {
            amount: amount * 100, //amount must be multiplies by 100 
            currency,
            receipt : `receipt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,//optional
            notes: { //optional (we can send any information through this)
                courseId: courseId,
                userId,
            }
        }

        try {
            //initiate the payment using razorpay
            const paymentResponse = await instance.orders.create(options)
            console.log(paymentResponse)
            //return response
            return res.status(200).json({
                success: true,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount,
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Could not initiate order"
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Could not capture the payment"
        })
    }
}


//verify signature of Razorpay and Server
//payment will get authorised only if the secret key send by Razorpay account and secret key of 
//the server matches.

exports.verifySignature = async (req, res) => {
    try {
        const webhookSecret = process.env.WEBHOOK_SECRET

        const signature = req.headers["x-razorpay-signature"]

        //study abouth these 3 lines
        const shasum = crypto.createHmac("sha256", webhookSecret)
        shasum.update(JSON.stringify(req.body))
        const digest = shasum.digest("hex")

        if (signature === digest) {
            console.log("Payment is Authorised")
            //courseId and userId cant be fetched from the UI because this api will be hit by Razorpay
            //so we will fetch it from the notes that we had sent in options while creating Razorpay order
            const { courseId, userId } = req.body.payload.payment.entity.notes

            try {
                //full fill the action
                //find the course and enroll the student
                const enrolledCourse = await Course.findOneAndUpdate(
                    { _id: courseId },
                    { $push: { studentsEnrolled: userId } },
                    { new: true }
                )

                if (!enrolledCourse) {
                    return res.status(500).json({
                        success: false,
                        message: "Course not found"
                    })
                }

                console.log(enrolledCourse)

                //find the student and add the course to his courses list
                const enrolledStudent = await User.findOneAndUpdate(
                    { _id: userId },
                    { $push: { courses: courseId } },
                    { new: true },
                )

                console.log(enrolledStudent)

                //send confirmation mail of course enrollment
                const emailResponse = await mailSender(
                    enrolledStudent.email,
                    "Congratulation from StudyNotion",
                    courseEnrollmentEmail(enrolledCourse.courseName,enrolledStudent.firstName)
                )

                console.log(emailResponse)

                return res.status(200).json({
                    success: true,
                    message: "Signature verified and Course added"
                })

            } catch (error) {
                console.log(error)
                return res.status(400).json({
                    success: false,
                    message: "Signature not verified"
                })
            }

        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong in verifiying signature"
        })
    }
}
