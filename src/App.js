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
import EnrolledCourses from './components/core/Dashboard/EnrolledCourse.jsx/EnrolledCourses';
import PurchaseHistory from './components/core/Dashboard/PurchaseHistory';
import Wishlist from './components/core/Dashboard/Wishlist/Wishlist';
import InstructorCourses from './components/core/Dashboard/InstructorCourses';
import CreateNewCourse from './components/core/Dashboard/Create New Course/CreateNewCourse';
import Catelog from './pages/Catelog/Catalog';
import CourseDetails from './pages/Catelog/CourseDetails';
import ViewEnrolledCourse from './components/core/Dashboard/EnrolledCourse.jsx/ViewEnrolledCourse';
import { useSelector } from 'react-redux';
import Sidebar from './components/common/Sidebar';

function App() {

  const { token } = useSelector((state) => state.auth)
  const { showSideBar } = useSelector((state) => state.profile)

  return (
    <div className='relative flex flex-col bg-[#000814] min-h-screen font-inter'>
      <Navbar />
      {
        showSideBar &&
        <div 
        className="absolute left-0 top-0 sidebar min-h-[100vh] h-full sm:hidden lg:w-[15%] w-[25%]
         text-[#838894] text-sm bg-[#161D29] z-50 ">
          <Sidebar/>
        </div>
      }
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/about' element={<About />} ></Route>
        <Route path='/catalog' element={<Catelog />} ></Route>
        <Route path='/catalog/course-details' element={<CourseDetails />} ></Route>
        <Route path='/signup' element={<SignUp />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/reset-password' element={<ResetPassword />} ></Route>
        <Route path='/reset-password/:token' element={<SetNewPassword />} ></Route>
        <Route path='/otp-verification' element={<OtpVerification />} ></Route>
        <Route path='/contact-us' element={<ContactUs />} ></Route>
        {
          token &&
          <Route path='/profile/enrolled-courses/view-course' element={<ViewEnrolledCourse />} ></Route>
        }
        {
          token &&
          <Route path='/profile' element={<Dashboard />} >
            <Route path='my-profile' element={<Profile />} ></Route>
            <Route path='setting' element={<Setting />} ></Route>
            <Route path='enrolled-courses' element={<EnrolledCourses />} ></Route>
            <Route path='wishlist' element={<Wishlist />} ></Route>
            <Route path='purchase-history' element={<PurchaseHistory />} ></Route>
            <Route path='instructor-courses' element={<InstructorCourses />} ></Route>
            <Route path='instructor-courses/create-new-course' element={<CreateNewCourse />} ></Route>
          </Route>
        }
      </Routes>
    </div>
  );
}

export default App;
