const express = require('express')
const router = express.Router()

const {capturePayment,verifySignature} = require('../controllers/Payment')
const {auth,isInstructor,isAdmin,isStudent} = require("../middlewares/auth")

router.post("/capturePayment",auth,isStudent,capturePayment)
router.post("/verifySignature",verifySignature)

module.exports = router