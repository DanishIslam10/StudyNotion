# StudyNotion — Ed-Tech Platform

A full-stack ed-tech web application where instructors can create and publish courses, and students can browse, purchase, and consume them. Built with the MERN stack and integrated with Razorpay for payments and Cloudinary for media storage.

**Live Demo:** [studynotion.netlify.app]([https://studynotion.netlify.app](https://study-notion-iota-three.vercel.app/)) &nbsp;|&nbsp; **GitHub:** [DanishIslam10/StudyNotion](https://github.com/DanishIslam10/StudyNotion)

---

## Features

**For Students**
- Browse and filter courses by category
- Add courses to cart and purchase via Razorpay payment gateway
- Stream enrolled course videos directly in the browser
- Track enrolled courses with section-level progress view
- OTP-based email verification on signup
- Password reset via secure tokenized email link

**For Instructors**
- Multi-step course creation: Course Info → Section/Lecture Builder → Publish Settings
- Upload course thumbnail images and lecture videos (stored on Cloudinary)
- Video duration auto-calculated via ffmpeg on the backend
- Publish or save as draft — control course visibility
- Manage and delete courses from instructor dashboard

**General**
- JWT-based authentication with role-based access control (Student / Instructor / Admin)
- Secure HTTP-only cookies for token storage
- Profile management — update name, bio, contact, display picture
- Responsive UI across mobile, tablet, and desktop
- Contact form with dual-email notification (user + admin)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Redux Toolkit, React Router v6, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Authentication | JWT, bcrypt, HTTP-only cookies |
| File Storage | Cloudinary (images + videos) |
| Payments | Razorpay |
| Email | Nodemailer |
| Video Processing | fluent-ffmpeg |
| Deployment | Netlify (frontend), backend hosted separately |

---

## Project Structure

```
studynotion/
├── src/                        # React frontend
│   ├── components/
│   │   ├── common/             # Navbar, Sidebar, Spinner, shared inputs
│   │   └── core/
│   │       ├── Auth/           # Profile dropdown
│   │       ├── Dashboard/      # Profile, Settings, Enrolled & Instructor course views
│   │       └── HomePage/       # Landing page sections, Footer
│   ├── pages/                  # Route-level pages (Home, Login, SignUp, Catalog, etc.)
│   ├── slices/                 # Redux state slices (auth, profile, cart, catalog, courses)
│   ├── services/               # Axios instance, API endpoint constants, operation hooks
│   └── data/                   # Static data (navbar links, footer links, homepage explore)
│
└── server/                     # Express backend
    ├── controllers/            # Auth, Course, Section, SubSection, Payment, Profile, etc.
    ├── model/                  # Mongoose schemas (User, Course, Section, SubSection, OTP, etc.)
    ├── routes/                 # Route definitions (User, Course, Payment, Profile, ContactUs)
    ├── middlewares/            # JWT auth, role guards (isStudent, isInstructor, isAdmin)
    ├── config/                 # Cloudinary, MongoDB, Razorpay setup
    ├── mail/templates/         # HTML email templates
    └── utils/                  # mailSender, mediaUploader
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas URI)
- Cloudinary account
- Razorpay account (test keys work fine)
- SMTP credentials (e.g. Gmail App Password)

### 1. Clone the repository

```bash
git clone https://github.com/DanishIslam10/StudyNotion.git
cd StudyNotion
```

### 2. Set up environment variables

Create `.env` in the root (frontend):

```env
REACT_APP_BACKEND_URL=http://localhost:4000/api/v1
REACT_APP_BASE_URL=http://localhost:4000/api/v1
```

Create `server/.env`:

```env
PORT=4000
DATABASE_URL=your_mongodb_uri
JWT_SECRET=your_jwt_secret

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=studynotion

RAZORPAY_KEY=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret

MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password

FRONT_END_URL=http://localhost:3000
```

### 3. Install dependencies and run

```bash
# Install all dependencies (root + server)
npm install
cd server && npm install && cd ..

# Run both frontend and backend concurrently
npm run dev
```

Frontend runs on `http://localhost:3000`, backend on `http://localhost:4000`.

---

## API Overview

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/v1/auth/user/sendotp` | Send OTP to email | Public |
| POST | `/api/v1/auth/user/signup` | Register new user | Public |
| POST | `/api/v1/auth/user/login` | Login user | Public |
| POST | `/api/v1/auth/user/logout` | Logout user | Auth |
| POST | `/api/v1/auth/user/resetPasswordUrl` | Send password reset link | Public |
| POST | `/api/v1/auth/user/resetPassword` | Reset password with token | Public |
| GET | `/api/v1/course/showAllCourses` | Fetch all courses | Public |
| POST | `/api/v1/course/createCourse` | Create a new course | Instructor |
| POST | `/api/v1/course/createSection` | Add section to course | Instructor |
| POST | `/api/v1/course/createSubSection` | Add lecture to section | Instructor |
| GET | `/api/v1/course/getEnrolledCourses` | Get student's enrolled courses | Student |
| POST | `/api/v1/payment/capturePayment` | Initiate Razorpay order | Student |
| POST | `/api/v1/payment/verifyPayment` | Verify payment & enroll | Student |
| PUT | `/api/v1/profile/updateProfileDetails` | Update profile info | Auth |
| PUT | `/api/v1/profile/updateDisplayPicture` | Change profile picture | Auth |
| DELETE | `/api/v1/profile/deleteAccount` | Delete account | Auth |

---

## Key Implementation Details

**OTP Flow** — OTPs are generated, stored in MongoDB with a 5-minute TTL index, and emailed via Nodemailer. A Mongoose `pre("save")` hook on the OTP model triggers the email automatically.

**Razorpay Integration** — Frontend loads the Razorpay checkout SDK dynamically, initiates an order via `/capturePayment`, and on success calls `/verifyPayment` which uses HMAC-SHA256 signature verification before enrolling the student.

**Video Duration** — On subsection creation, the uploaded video URL is passed to `fluent-ffmpeg`'s `ffprobe` to extract duration in seconds, which is stored and aggregated at the section level for display.

**Cloudinary Upload** — All media (thumbnails, profile pictures, lecture videos) uses `express-fileupload` with temp files, uploaded to Cloudinary with `resource_type: "auto"` to handle both image and video.

**Redux State Architecture** — Application state is split into 7 slices: `auth`, `profile`, `cart`, `catalog`, `newCourse`, `instructorCourses`, `enrolledCourses`. A custom `RESET_STORE` action resets all slices on logout.

---

## Screenshots


## Author

**Danish Islam** — Full Stack & Generative AI Developer

[LinkedIn](https://www.linkedin.com/in/danish-islam-85a127291/) &nbsp;|&nbsp; [GitHub](https://github.com/DanishIslam10) &nbsp;|&nbsp; danishislam328@gmail.com
