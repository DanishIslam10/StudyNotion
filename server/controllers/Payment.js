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

    //get courseId and userId (who is the user and what course is he buying)
    const { courses } = req.body
    const userId = req.user.id
    console.log('courses for payment: ',courses)
    console.log('user id for payment: ',userId)
    //apply validation on courseId
    if (!courses) {
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
    let totalAmount = 0
    for (let courseId of courses) {
        let course
        try {
            course = await Course.findById(courseId)
            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: "Course not found"
                })
            }
            const uid = new mongoose.Types.ObjectId(userId)
            if (course?.studentsEnrolled?.includes(uid)) {
                return res.status(402).json({
                    success: false,
                    message: "Student is already enrolled"
                })
            }
            totalAmount += course.price
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "something went wrong in calculating total amount."
            })
        }
    }
    console.log("total amount for payment: ",totalAmount)
    //amount and currency is mendatory to create an razorpay order
    //creating payload for razorpay order
    const options = {
        amount: totalAmount * 100, //amount must be multiplies by 100 
        currency: "INR",
        receipt: `receipt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,//optional
    }

    try {
        //initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options)
        console.log("payment response is:",paymentResponse)
        //return response
        return res.status(200).json({
            success: true,
            data: paymentResponse,
            message: "Order is initiated"
        })
    } catch (error) {
        console.log("error in payment response is: ",error)
        return res.status(500).json({
            success: false,
            message: "Could not initiate order"
        })
    }
}

//verify signature of Razorpay and Server
//payment will get authorised only if the secret key send by Razorpay account and secret key of 
//the server matches.

exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses

    const userId = req.user.id

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(200).json({
            success: false,
            message: "Payment Failed"
        }) 
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex")

    if (expectedSignature === razorpay_signature) {
        await enrollStudents(courses, userId, res)
        return res.status(200).json({ success: true, message: "Payment Verified" })
    }

    return res.status(200).json({
        success: false,
        message: "Payment Failed"
    })
}

const enrollStudents = async (courses, userId) => {

    if (!courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please Provide Course ID and User ID"
        })
    }

    for (const courseId of courses) {
        try {
            // Find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { new: true }
            )

            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    error: "Course not found"
                })
            }
            console.log("Updated course: ", enrolledCourse)

            // Find the student and add the course to their list of enrolled courses
            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                { $push: { courses: courseId } },
                { new: true }
            )
            console.log("Enrolled student: ", enrolledStudent)
            // Send an email notification to the enrolled student

        } catch (error) {
            console.log(error)
            return res.status(400).json({
                success: false,
                error: error.message
            })
        }
    }
}
