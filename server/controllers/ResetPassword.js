const User = require('../model/User')
const mailSender = require('../utils/mailSender')
const bcrypt = require('bcrypt')

//generate unique url for password reset page
exports.resetPasswordUrl = async (req, res) => {
    try {
        //fetch email from req body
        const { email } = req.body
        //check if user does not exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        //generate token
        const token = crypto.randomUUID(); // refer to imp notes
        //update user(entry of existing user)
        const updatedUser = await User.findOneAndUpdate(
            { email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000,
            },
            { new: true }
        )
        //create url
        //this url will redirect the user to the port on which front end is running (eg:3000)
        const url = `http://localhost:3000/reset-password/${token}`
        //mail this url to the user
        await mailSender(
            email,
            "Password Reset Link",
            `Click here to reset your password : ${url}`
        )
        //send success response
        res.status(200).json({
            success: true,
            message: "Email send successfully, please check your email and change your password"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong while sending reset password email"
        })
    }
}

//reset password
exports.resetPassword = async (req, res) => {
    try {
        //fetch data
        const { newPassword, confirmNewPassword, token } = req.body
        // in reality we have sent the token inside the params, but here we are fetching the token from
        // request body because we will explicitly put the token inside request body in front end side

        //perform validation
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false, 
                message: "Passwords do not match"
            })
        }

        //fetch use details from db using token (that token which we had inserted in user model)
        const user = await User.findOne({ token:token })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Token is invalid"
            })
        }

        //check if the token is expired
        if (user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Token is expired , please generate your new token"
            })
        }
        console.log("new password : ",newPassword)
        //hash the password
        const hashedPassword = await bcrypt.hash(newPassword, 10)

        //update the password in the db
        const updatedUser = await User.findOneAndUpdate(
            { token },
            { $set: {password : hashedPassword} },
            { new: true }
        )

        //send success response
        res.status(200).json({
            success: true,
            data: updatedUser,
            message: "Password reset successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong while reseting the password"
        })
    }
}