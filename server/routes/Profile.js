const express = require('express')
const router = express.Router()

const {
    updateProfileDetails,
    deleteAccount,
    getUserDetails,
    updateDisplayPicture,
    changePassword, 
    removeDisplayPicture
} = require('../controllers/Profile')

const { auth } = require('../middlewares/auth')

router.put("/updateProfileDetails", auth, updateProfileDetails)
router.delete("/deleteAccount", auth, deleteAccount)
router.get("/getUserDetails", auth, getUserDetails)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.put("/changePassword", auth, changePassword)
router.put("/removeDisplayPicture",auth,removeDisplayPicture)

module.exports = router