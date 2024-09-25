const RatingAndReview = require('../model/RatingAndReview')
const Course = require('../model/Course')
const mongoose = require('mongoose')

//create rating
exports.createRating = async (req, res) => {
    try {
        //fetch user id
        const userId = req.user.userId
        //fetch other data from req.body
        const { courseId, rating, review } = req.body
        //validation
        if (!courseId || !rating || !review) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const course = await Course.find({ _id: courseId })
        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Course details not found"
            })
        }
        //check if user is enrolled in the course or not (only enrolled student can give rating and review)
        if (!course.studentsEnrolled.includes(userId)) {
            return res.status(400).json({
                success: false,
                message: "Only enrolled students can give review and rating"
            })
        }

        //check if the user has already given rating and review
        //only single rating and review can be submited by a user

        const hasAlreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
            //both user and course must present
        })

        if (hasAlreadyReviewed) {
            return res.status(400).json({
                success: false,
                message: "Student's rating and review is already present"
            })
        }

        //create entry in db
        const ratingAndReview = await RatingAndReview.create({
            user: userId,
            rating,
            review,
            course: courseId,
        })

        //push this newly created ratingAndReview inside Course model
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { $push: { ratingAndReviews: ratingAndReview._id } },
            { new: true }
        )

        //send success response
        return res.status(200).json({
            success: true,
            data: ratingAndReview,
            message: "rating and review submited successfully"
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "cannot create rating"
        })
    }
}

//get average rating of the course
exports.getAverageRating = async (req, res) => {
    try {
        //get course id
        const courseId = req.body.courseId

        //calculate average rating
        //study the aggregate function in detail for better understanding (refer notes)
        const result = await RatingAndReview.aggregate([
            {   //this will find all the entries in RatingAndReview model which matches the condition
                //mentioned inside the block
                $match: {
                    course: new mongoose.Types.ObjectId(courseId)
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                }
            }
        ])
        //return rating
        if (result.length > 0) {  //result will be an array (will ensured while testing)
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating
            })
        }

        //if no rating/review exist
        return res.status(200).json({
            success: true,
            averageRating: 0,
            message: "average rating is 0, no ratings given till now"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "cannot get Average Rating"
        })
    }
}

//get all ratings and reviews (this is not for any specific course, it will return all the ratings)

exports.getAllRatings = async (req, res) => {
    try {
        const allRatingAndReviews = await RatingAndReview.find({})
            //sorting in descending order based on rating
            .sort({ rating: "desc" })
            //this is another of populating a field in which we can specifically provide the value which we need
            //out of the entire model by using 'select' keyword
            .populate({
                path: "user",
                select: "firstName lastName email image",
            })
            .populate({
                path: "course",
                select: "courseName",
            })
            .exec()
        return res.status(200).json({
            success: true,
            data: allRatingAndReviews,
            message: "all reviews are fetched successfuly"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "cannot get all reviews"
        })
    }
}

