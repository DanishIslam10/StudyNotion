// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {sendOTP,login,signUp,logout} = require("../controllers/Auth")
const {resetPasswordUrl,resetPassword} = require("../controllers/ResetPassword")

const { auth } = require("../middlewares/auth")

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login",login)

// Route for user signup
router.post("/signup", signUp)

// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP)

router.post("/logout", logout)
// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/resetPasswordUrl", resetPasswordUrl)

// Route for resetting user's password after verification
router.post("/resetPassword", resetPassword)

// Export the router for use in the main application
module.exports = router