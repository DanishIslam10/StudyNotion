const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors");
const fileUpload = require('express-fileupload');
require("dotenv").config();

// CORS configuration to allow multiple origins
const allowedOrigins = [
    'https://study-notion-re5n84rg5-danthebests-projects.vercel.app', // your frontend URL
    'https://study-notion-1sxu6u68q-danthebests-projects.vercel.app', // another frontend URL (if any)
    // Add more URLs here if you have multiple frontends
];

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin: (origin, callback) => {
            if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
                callback(null, true); // Allow the origin
            } else {
                callback(new Error('Not allowed by CORS')); // Reject the origin
            }
        },
        credentials: true, // Important for handling cookies and authentication
    })
);

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
);

// Database connection
const { connectDB } = require("./config/database");
connectDB();

// Cloudinary connection
const { cloudinaryConnect } = require("./config/cloudinary");
cloudinaryConnect();

// Import routes
const userRoutes = require("./routes/User");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payment");
const profileRoutes = require("./routes/Profile");
const contactUsRoute = require("./routes/ContactUs");

// Link the routes with a fixed prefix
app.use("/api/v1/auth/user", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1", contactUsRoute);

// Default route for checking if the server is up
app.get("/", (req, res) => {
    res.send(`<h1>Your server is running on port no: ${process.env.PORT}</h1>`);
});

// Start the backend server
app.listen(process.env.PORT, () => {
    console.log("App is running");
});
