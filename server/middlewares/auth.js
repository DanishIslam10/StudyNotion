const jwt = require('jsonwebtoken')
require("dotenv").config()
const User = require('../model/User')

// the main aim of this auth middleware is to fetch and decode the token by which it can check the role of the user
exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token 

        console.log("Cookie ka Token: ", req.cookies.token)

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            // request object me ek new property (user naam ki) banadi or uski value 'decode' rkhdi
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Cannot decode the token",
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching the token",
        });
    }
};

exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "Access Denied ! this is protected route for students"
            })
        }

        next()

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "error in user role matching"
        })
    }
}


exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "Access Denied ! this is protected route for Instructor"
            })
        }

        next()

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "error in user role matching"
        })
    }
}

exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "Access Denied ! this is protected route for admin"
            })
        }

        next()

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "error in user role matching"
        })
    }
}
