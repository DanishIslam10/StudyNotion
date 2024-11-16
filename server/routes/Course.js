const express = require('express')
const router = express.Router()

//course controller
const {
    createCourse,
    showAllCourses,
    getCourseDetails,
    getEnrolledCourses,
    getInstructorCourses,
    setCourseStatus,
    deleteCourse,
} = require('../controllers/Course')

//course content controller (section)
const {createSection,updateSection,deleteSection} = require('../controllers/Section')

//course content controller (sub-section)
const {createSubSection,updateSubSection,deleteSubSection} = require('../controllers/SubSection')

//course categories controller
const {createCategory,showAllCategories,categoryPageDetails,deleteCategory} = require("../controllers/Category")

//course rating and review controller
const {createRating,getAverageRating,getAllRatings} = require('../controllers/RatingAndReview')

//import all the middlewares
const {auth,isStudent,isInstructor,isAdmin} = require('../middlewares/auth')


// ****************************************************************************************************
//                                      COURSE ROUTES
//*****************************************************************************************************

//course can only be created by instructor
router.post("/createCourse",auth,isInstructor,createCourse)
router.put("/setCourseStatus",auth,isInstructor,setCourseStatus)
router.delete("/deleteCourse",auth,isInstructor,deleteCourse)
router.get("/getEnrolledCourses",auth,isStudent,getEnrolledCourses)
router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses)
router.get("/showAllCourses",showAllCourses)
router.post("/getCourseDetails",getCourseDetails)

router.post("/createSection",auth,isInstructor,createSection)
router.put("/updateSection",auth,isInstructor,updateSection)
router.delete("/deleteSection",auth,isInstructor,deleteSection)

router.post("/createSubSection",auth,isInstructor,createSubSection)
router.put("/updateSubSection",auth,isInstructor,updateSubSection)
router.delete("/deleteSubSection",auth,isInstructor,deleteSubSection)


// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************

//Category can only be created by admin
router.post("/createCategory",auth,isAdmin,createCategory)
router.get("/showAllCategories",showAllCategories)
router.post("/categoryPageDetails",categoryPageDetails)
router.delete("/deleteCategory",auth,isAdmin,deleteCategory)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************

router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRatings)

module.exports = router