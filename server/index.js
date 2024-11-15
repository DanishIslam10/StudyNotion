const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require("cors")
const fileUpload = require('express-fileupload')
require("dotenv").config()

//middlewares
app.use(cookieParser())
app.use(express.json())
app.use(
    cors({
        origin:process.env.FRONT_END_URL,
        credentials:true,
    })
)
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

//db connection
const {connectDB} = require("./config/database")
connectDB()

//cloudinary connection
const {cloudinaryConnect} = require("./config/cloudinary")
cloudinaryConnect()

//import routes
const userRoutes = require("./routes/User")
const courseRoutes = require("./routes/Course")
const paymentRoutes = require("./routes/Payment")
const profileRoutes = require("./routes/Profile")
const contactUsRoute = require("./routes/ContactUs") 

//link the routes and provide fixed prefix
app.use("/api/v1/auth/user",userRoutes)
app.use("/api/v1/course",courseRoutes)
app.use("/api/v1/profile",profileRoutes)
app.use("/api/v1/payment",paymentRoutes)
app.use("/api/v1",contactUsRoute)

//default route
app.get("/",(req,res) => {
    res.send(`<h1>Your server is running on port no: ${process.env.PORT}  </h1>`)
})

//start the backend
app.listen(process.env.PORT,() => {
    console.log("App is running")
})
