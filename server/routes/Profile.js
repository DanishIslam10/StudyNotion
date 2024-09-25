const express = require('express')
const router = express.Router()

const {updateProfile,deleteAccount,getUserDetails,updateDisplayPicture,changePassword} = require('../controllers/Profile')
const {auth} = require('../middlewares/auth')

router.put("/updateProfile",auth,updateProfile)
router.delete("/deleteAccount",auth,deleteAccount)
router.get("/getUserDetails",auth,getUserDetails)
router.put("/updateDisplayPicture",auth,updateDisplayPicture)
router.put("/changePassword",auth,changePassword)


module.exports = router