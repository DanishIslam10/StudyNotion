import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import SetNewPassword from './pages/SetNewPassword';
import OtpVerification from './pages/OtpVerification';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Dashboard from './pages/Dashboard';
import Profile from './components/core/Dashboard/Profile';
import Setting from './components/core/Dashboard/Setting';
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses';
import PurchaseHistory from './components/core/Dashboard/PurchaseHistory';
import EditProfileDetails from './components/core/Dashboard/Setting';
import Wishlist from './components/core/Dashboard/Wishlist';
import InstructorCourses from './components/core/Dashboard/InstructorCourses';
import CourseInformation from './components/core/Dashboard/Create New Course/CourseInformation';
import CourseBuilder from './components/core/Dashboard/Create New Course/CourseBuilder';

function App() {
  return (
    <div className='flex flex-col bg-[#000814] min-h-screen font-inter'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/signup' element={<SignUp />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/reset-password' element={<ResetPassword />} ></Route>
        <Route path='/reset-password/:token' element={<SetNewPassword />} ></Route>
        <Route path='/otp-verification' element={<OtpVerification />} ></Route>
        <Route path='/about' element={<About />} ></Route>
        <Route path='/contact-us' element={<ContactUs />} ></Route>
        <Route path='/profile' element={<Dashboard />} >
          <Route path='my-profile' element={<Profile />} ></Route>
          <Route path='setting' element={<Setting />} ></Route>
          <Route path='enrolled-courses' element={<EnrolledCourses />} ></Route>
          <Route path='wishlist' element={<Wishlist />} ></Route>
          <Route path='purchase-history' element={<PurchaseHistory />} ></Route>
          <Route path='instructor-courses' element={<InstructorCourses />} ></Route>
          <Route path='instructor-courses/create-new-course/course-information'element={<CourseInformation />} ></Route>
          <Route path='instructor-courses/create-new-course/course-builder'element={<CourseBuilder/>} ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
