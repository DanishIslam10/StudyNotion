const { instance } = require("../config/razorpay");
const Course = require("../model/Course");
const User = require("../model/User");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const mongoose = require("mongoose");
const crypto = require("crypto");


// ========================================
// CAPTURE PAYMENT
// ========================================
exports.capturePayment = async (req, res) => {
    try {
        const { courses } = req.body;
        const userId = req.user.id;

        // Validation
        if (!courses || !Array.isArray(courses) || courses.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid course ids",
            });
        }

        let totalAmount = 0;

        for (const courseId of courses) {
            const course = await Course.findById(courseId);

            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: `Course not found: ${courseId}`,
                });
            }

            // Check already enrolled
            const uid = new mongoose.Types.ObjectId(userId);

            if (course.studentsEnrolled.includes(uid)) {
                return res.status(400).json({
                    success: false,
                    message: `Already enrolled in ${course.courseName}`,
                });
            }

            totalAmount += course.price;
        }

        // Razorpay order options
        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        // Create order
        const paymentResponse = await instance.orders.create(options);

        return res.status(200).json({
            success: true,
            data: paymentResponse,
            message: "Order created successfully",
        });

    } catch (error) {
        // console.log("Capture Payment Error:", error);

        return res.status(500).json({
            success: false,
            message: "Could not initiate order",
            error: error.message,
        });
    }
};


// ========================================
// VERIFY PAYMENT
// ========================================
exports.verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            courses,
        } = req.body;

        const userId = req.user.id;

        // Validation
        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature ||
            !courses ||
            !userId
        ) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed",
            });
        }

        // Generate signature
        const body = `${razorpay_order_id}|${razorpay_payment_id}`;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body)
            .digest("hex");

        // Verify signature
        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid signature",
            });
        }

        // Enroll student
        await enrollStudents(courses, userId);

        return res.status(200).json({
            success: true,
            message: "Payment verified and student enrolled",
        });

    } catch (error) {
        // console.log("Verify Payment Error:", error);

        return res.status(500).json({
            success: false,
            message: "Payment verification failed",
            error: error.message,
        });
    }
};


// ========================================
// ENROLL STUDENTS
// ========================================
const enrollStudents = async (courses, userId) => {

    for (const courseId of courses) {

        // Add student to course
        const enrolledCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $addToSet: {
                    studentsEnrolled: userId,
                },
            },
            { new: true }
        );

        if (!enrolledCourse) {
            throw new Error("Course not found");
        }

        // Add course to user
        const enrolledStudent = await User.findByIdAndUpdate(
            userId,
            {
                $addToSet: {
                    courses: courseId,
                },
            },
            { new: true }
        );

        // Send confirmation email
        try {
            await mailSender(
                enrolledStudent.email,
                "Course Enrollment",
                courseEnrollmentEmail(
                    enrolledCourse.courseName,
                    `${enrolledStudent.firstName}`
                )
            );
        } catch (mailError) {
            // console.log("Email Error:", mailError);
        }
    }
};