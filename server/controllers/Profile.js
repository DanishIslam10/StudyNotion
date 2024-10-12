//when we created Auth controller , we had already created 'additionalDetails' in User model
//initially we assigned Null to each value inside addtionalDetails
//now we can just update the profile details (addtionalDetails which refers to Profile Model)

const Course = require("../model/Course")
const Profile = require("../model/Profile")
const User = require("../model/User")
const { uploadMediaToCloudinary } = require("../utils/mediaUploader")
require("dotenv").config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mailSender = require('../utils/mailSender')

exports.updateProfileDetails = async (req, res) => {
    try {
        //"" it means default value , if not provided then its empty string
        const { firstName, lastName, contactNumber, about } = req.body
        //fetch user id
        const { id } = req.user
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User id not found"
            })
        }
        //find profile
        const userDetails = await User.findById(id)
        const profileId = userDetails.additionalDetails
        const profileDetails = await Profile.findById(profileId)

        //update profile details
        //applying another method to save entry in db
        //make the object ready
        if (firstName) {
            userDetails.firstName = firstName
        }
        if (lastName) {
            userDetails.lastName = lastName
        }
        if (contactNumber) {
            profileDetails.contactNumber = contactNumber
        }
        if (about) {
            profileDetails.about = about
        }
        //save it inside db
        await profileDetails.save()
        await userDetails.save()

        //return success response
        return res.status(200).json({
            success: true,
            data: profileDetails,
            message: "Profile details updated successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Cannot update the profile details"
        })
    }
}

//change password
exports.changePassword = async (req, res) => {
    try {
        //fetch data
        const { oldPassword, newPassword, confirmNewPassword } = req.body
        console.log("Body : ", req.body)
        //apply validation
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "fill the required fields"
            })
        }
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "new password and confrim new password field do not match"
            })
        }
        //fetch token
        const { token } = req.cookies
        console.log(token)
        if (!token) {
            return res.status(404).json({
                success: false,
                message: "Token is missing"
            })
        }
        let decode;
        //decode the token to obtain user details
        try {
            decode = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decode)
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "cant decode the token"
            })
        }
        //fetch id from decode
        const { id } = decode
        console.log(id)
        //hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10)
        //update the password in db
        const updatedUser = await User.findOneAndUpdate(
            { _id: id },
            { $set: { password: hashedNewPassword } },
            { new: true }
        )
        console.log(updatedUser)

        //send mail of password updation
        await mailSender(decode.email, "Accound Password Updated", "isn't that you ?")

        res.status(200).json({
            success: true,
            data: updatedUser,
            message: "Password updated successfully",
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Password updation failed, please try again"
        })
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        const { id } = req.user
        const userDetails = await User.findById(id)
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User not found, please provide correct user id"
            })
        }
        //delete Profile
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails })
        //delete from studentsEnrolled (inside Course Model)
        await Course.updateMany(
            { studentsEnrolled: id },
            { $pull: { studentsEnrolled: id } }
        )
        //delete User
        await User.findByIdAndDelete(id)

        //return success response
        return res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Cannot delete Account"
        })
    }
}

exports.getUserDetails = async (req, res) => {
    try {
        const { id } = req.user
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User not found, please provide correct user id"
            })
        }
        const userDetails = await User.findById(id).populate("additionalDetails").exec()
        return res.status(200).json({
            success: true,
            data: userDetails,
            message: "User Details Fetched successsfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Cannot fetch User Details"
        })
    }
}

//update profile picture
exports.updateDisplayPicture = async (req, res) => {
    try {
        const { id } = req.user
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User not authenticated",
            });
        }
        console.log("User id: ", id)

        if (!req.files || !req.files.imageFile) {
            return res.status(400).json({
                success: false,
                message: "No image file uploaded",
            });
        }

        const { imageFile } = req.files
        console.log("imageFileObject", imageFile)

        const imageDetails = await uploadMediaToCloudinary(
            imageFile,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log("image details : ", imageDetails)
        const updatedProfile = await User.findByIdAndUpdate(
            id,
            { $set: { image: imageDetails.secure_url } },
            //$push is only used if the field is array
            { new: true }
        )
        return res.status(200).json({
            success: true,
            imgUrl: imageDetails.secure_url,
            message: "Profile picture updated successfully",
        });

    } catch (error) {
        console.error("Error updating profile picture:", error);
        return res.status(500).json({
            success: false,
            message: "Cannot update profile picture",
        });
    }
};

//remove dp
exports.removeDisplayPicture = async (req, res) => {
    try {
        const { id } = req.user
        const user = await User.findById(id)
        const image = `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName}%20${user.lastName}`
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: { image: image } },
            { new: true }
        )
        res.status(200).json({
            success: true,
            data: updatedUser,
            message: "Display Picture Removed"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Cant Remove Display Picture"
        })
    }
}