const Course = require('../model/Course')
const Category = require('../model/Category')
const User = require('../model/User')
const Section = require("../model/Section")
const SubSection = require("../model/SubSection")
const {uploadMediaToCloudinary} = require('../utils/mediaUploader')
const { default: mongoose } = require('mongoose') 
require('dotenv').config()

//course can only be created by user type 'Instructor' so will add a middleware of 'isInstructor' in route
exports.createCourse = async (req, res) => {
    try {
        //fetch data
        const { courseName, courseDescription, whatWillYouLearn, price, category, tag, status = "Pending" } = req.body
        console.log("Request Body:",req.body)
        //fetch thumbnail image
        const { thumbnail } = req.files
        //apply validation
        const requiredValues = [thumbnail,courseName, courseDescription, whatWillYouLearn, price, category, tag, status]
        for (const [field, value] of Object.entries(requiredValues)) {
            if (!value) {
                return res.status(404).json({
                    success: false,
                    message: ` ${field} is required`
                })
            }
        }
        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({
                success: false,
                message: "Invalid category ID format"
            });
        }
        //fetch instructor details (will be used later)
        const userId = req.user.id //we had inserted the user object inside req in auth middleware
        const instructorDetails = await User.findById(userId)
        console.log("Instructor Details: ", instructorDetails)

        //if instructor details could not be fetched for some reason
        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor details not found"
            })
        }

        //apply category validation that if the provided category with this course is valid or not
        //category validation can also be done on front end side by creating a drop down in which only
        //some specific value can be selected but we will also apply category validation in the backend
        //so that wrong category cant be provided even from Postman

        // !!! line-42 to line 51 ---> did not understand properly
        const categoryDetails = await Category.findById(category)
        console.log("Category Details : ",categoryDetails)
        //category (req.body wala) is an id so we can directly apply findById() query
        //'category is an id' to understand this, go to User schema 
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "category Details not found"
            })
        }

        //upload thumbnail image to cloudinary
        const thumbnailImageDetails = await uploadMediaToCloudinary(thumbnail, process.env.FOLDER_NAME, 1000, 1000)

        //create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatWillYouLearn: whatWillYouLearn,
            price,
            tag,
            category:categoryDetails._id,
            thumbnail: thumbnailImageDetails.secure_url,
            status,
        })

        const populatedCourse = await Course.findById(newCourse._id)
        .populate({
            path:"courseContent",
            populate: {
                path:"subSection"
            }
        })

        //add the new course in the user schema of instructor inside the 'courses' array
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            { $push: { courses: newCourse._id } },
            { new: true }
        )

        //update category schema
        await Category.findByIdAndUpdate(
            category,
            { $push: { courses: newCourse._id } },
            { new: true }
        )

        //return success response
        res.status(200).json({
            success: true,
            data: populatedCourse,
            message: "Course created successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Failed to create new course" 
        })
    }
}

//publish course api
exports.setCourseStatus = async (req,res) => {
    try {

        const {courseId,status} = req.body

        if(!courseId) {
            return res.status(402).json({
                success:false,
                message:"course id not found"
            })
        }

        const course = await Course.findByIdAndUpdate(
            courseId,
            {$set:{status:status}},
            {new:true}
        )
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        })

        return res.status(200).json({
            success:true,
            data:course,
            message: status === "Published" ? ("Course Published") : ("Course Saved As Draft")  
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error in Publishing Course"
        })
    }
}

//delete course api
exports.deleteCourse = async (req,res) => {
    try {
        const {courseId} = req.body
        if(!courseId) {
            return res.status(402).json({
                success:false,
                message:"Course id is missing"
            })
        }
        //delete course from db
        await Course.findByIdAndDelete(courseId)
        //delete corresponding sections
        await Section.deleteMany({course:courseId})
        //delete corresponding sub sections
        await SubSection.deleteMany({course:courseId})

        return res.status(200).json({
            success:true,
            message:"Course Deleted"
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Cannot Delete Course , please try again"
        })
    }
}

//create get all courses api
exports.showAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({})
            .populate("instructor")
            .exec()

        return res.status(200).json({
            success: true,
            data: allCourses,
            message: "Data for all courses fetched successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Cannot Fetch All Courses"
        })
    }
}


exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "please provide valid courseId"
            })
        }
        const courseDetails = await Course.findById(courseId)
            //this is way to populate nested properties inside models
            .populate(
                {
                    //populate Instructor, instructor is a type of user, so in order to fetch all the details
                    //of instructor , we need to also populate the additonalDetails property inside User model
                    path: "instructor",
                    populate: {
                        path: "additionalDetails"
                    }
                }
            )
            .populate(
                {
                    path: "courseContent",
                    populate: {
                        path: "subSection"
                    }
                }
            )
            .populate(
                {
                    path: "ratingAndReviews",
                    populate: {
                        path: "user",
                        populate: {
                            path: "additionalDetails"
                        }
                    }
                }
            )
            .populate(
                {
                    path: "studentsEnrolled",
                    populate: {
                        path: "additionalDetails"
                    }
                }
            )
            .exec()

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find the course details with course id ${courseId}`
            })
        }

        return res.status(200).json({
            success: true,
            data: courseDetails,
            message: "Course details fetched successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Cannot Fetch Course details"
        })
    }
}

//get user enrolled courses
exports.getEnrolledCourses = async (req,res) => {
    try {
        const userId = req.user.id
        if(!userId) {
            return res.status(404).json({
                success:false,
                message:"user id not found"
            })
        }
        const user = await User.findById(userId)
        .populate({
            path:"courses",
            populate:{
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        })
        return res.status(200).json({
            success:true,
            data:user.courses,
            message:"user enrolled courses fetched successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"server error: cannot fetch user enrolled courses"
        })
    }
}

//get instructor courses
exports.getInstructorCourses = async(req,res) => {
    try {
        const {id} = req.user
        const user = await User.findById(id)
        .populate(
            {
                path:"courses",
                populate:{
                    path:"courseContent",
                    populate: {
                        path:"subSection"
                    }
                }
            }
        )
        .exec()
        if(!id || !user) {
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }
        if(!user.accountType === "Instructor") {
            return res.status(402).json({
                success:false,
                message:"This is protected route for Instructor"
            })
        }
        return res.status(200).json({
            success:true,
            data:user.courses,
            message:"Instructor courses fetched succesfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"server error: cant fetch instructor courses."
        })

    }
}