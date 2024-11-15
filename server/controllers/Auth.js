const User = require('../model/User')
const OTP = require('../model/OTP')
const Profile = require('../model/Profile')
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config()


// NOTE : sendOTP , signUp controllers ko relate karke analyse kro for better understanding

//send OTP
exports.sendOTP = async (req, res) => {
    try {
        //fetch email from request body
        const { email } = req.body

        //check if user already exists
        const user = await User.findOne({ email: email })

        //if user exists,return a response
        if (user) {
            return res.status(401).json({
                success: false,
                message: "User already registered"
            })
        }

        //Domain validation (restrict to some valid domains like gmail.com ,yahoo.com)
        const allowedDomains = ["gmail.com", "yahoo.com"]
        const emailDomain = email.split("@")[1]
        if (!allowedDomains.includes(emailDomain)) {
            return res.status(402).json({
                success: false,
                message: "Enter a valid domain in email"
            })
        }

        //generate otp
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })
        console.log("OTP is : ", otp)

        //check otp is unique or not
        //line no: 36 - line no: 43 tak ka code boht khrab hai because of brute force approach
        //db calls k upar loop chalana boht khrab hai
        //instead we should use a library which gives us unique otp every single time

        let result = await OTP.findOne({ otp: otp })

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            })
            result = await OTP.findOne({ otp: otp })
        }

        const otpPayload = { email, otp }

        // store otp in db
        const otpDoc = await OTP.create(otpPayload)

        console.log("OTP Doc: ", otpDoc)

        res.status(200).json({
            success: true,
            message: "OTP Sent Successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Could not send OTP"
        })
    }
}

exports.signUp = async (req, res) => {
    try {
        //fetch data from request body
        const {
            firstName,
            lastName,
            email,
            dateOfBirth,
            gender,
            password,
            confirmPassword,
            accountType,
            otp
        } = req.body

        console.log("user sign up data in the backend: ", req.body)

        //apply validation
        //account type isliye add nahi kiya bcz uski kuch na kch default value hogi hi 
        const requiredFields = { firstName, lastName, email, dateOfBirth, gender, password, confirmPassword, otp };

        for (const [field, value] of Object.entries(requiredFields)) {
            if (!value) {
                return res.status(403).json({
                    success: false,
                    message: `${field} is required`,
                });
            }
        }
        //after confirming that all feild are provided , apply password validation
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password fields does not match"
            })
        }
        //check if user already exists
        const userAlreadyExists = await User.findOne({ email: email })

        if (userAlreadyExists) {
            return res.status(400).json({
                success: false,
                message: "User is already registered"
            })
        }

        //find most recent otp stored for the user
        const recentOtp = await OTP.findOne({ email: email }).sort({ createdAt: -1 }).limit(1) //go to imp notes
        console.log("Recent OTP: ", recentOtp)
        console.log("input OTP: ", otp)

        //validate otp
        if (recentOtp.length === 0) {
            //otp not found
            return res.status(400).json({
                success: false,
                message: "OTP not found"
            })
        }
        else if (recentOtp.otp !== otp) {
            //otp did not match with provided otp from req.body
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        //save user entry in db

        const profileDetails = await Profile.create({
            //initially, fill all the details
            gender: gender,
            dateOfBirth: dateOfBirth,
            about: null,
            contactNumber: null,
        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`
        })

        res.status(200).json({
            success: true,
            user,
            message: "Account Created Successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "User cant be registered. Please try again"
        })
    }
}

//Login
exports.login = async (req, res) => {
    try {
        //fetch data
        const { email, password, accountType } = req.body

        const requiredFields = { email, password, accountType }

        //apply validation
        for (const [key, value] of Object.entries(requiredFields)) {
            if (!value) {
                return res.status(400).json({
                    success: false,
                    message: `${key} is required`
                })
            }
        }
        //check if user does not exists
        const user = await User.findOne({ email, accountType }).populate("additionalDetails").exec()
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exists"
            })
        }

        //otherwise, generate JWT , after password matching
        if (await bcrypt.compare(password, user.password)) {
            //define payload
            const payload = {
                id: user.id,
                email: user.email,
                accountType: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            })
            user.password = undefined
            //create cookie and send success response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                sameSite: "None"
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully"
            })
        }
        else {
            res.status(401).json({
                success: false,
                message: "Incorrect Password"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Login Failure, please try again"
        })
    }
}

