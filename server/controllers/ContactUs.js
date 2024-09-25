const User = require('../model/User')
const mailSender = require('../utils/mailSender')
const { contactFormEmailTemplateForUser, contactFormEmailTemplateForAdmin } = require("../mail/templates/contactFormEmail")
exports.contactUs = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, message } = req.body
        const required = [firstName, lastName, email, phoneNumber, message,]
        for (const [field, value] of Object.entries(required)) {
            if (!value) {
                return res.status(400).json({
                    success: false,
                    message: `${field} is required`
                })
            }
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
        //contact input field validation
        if (phoneNumber.length !== 10) {
            return res.status(402).json({
                success: false,
                message: "Phone number must contain 10 Digits"
            })
        }
        const mailResponseForUser = await mailSender(
            email,
            "Your data has been sent successfully",
            contactFormEmailTemplateForUser(firstName, lastName, email, phoneNumber, message)
        )

        const mailResponseForAdmin = await mailSender(
            process.env.MAIL_USER,
            "Contact Info sent by the user",
            contactFormEmailTemplateForAdmin(firstName, lastName, email, phoneNumber, message)
        )

        return res.status(200).json({
            success: true,
            data: mailResponseForUser, mailResponseForAdmin,
            message: "Mail Sent"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Cannot send the mail"
        })
    }
}