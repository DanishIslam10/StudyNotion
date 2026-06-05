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
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './components/common/Sidebar';
import { useEffect } from 'react';
import { setShowSideBar } from './slices/profileSlice';

function App() {

  const { token } = useSelector((state) => state.auth)
  const { showSideBar } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  useEffect(() => {
    if (showSideBar) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'  // lock <html> too
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [showSideBar])

  return (
    <div className='relative flex flex-col bg-[#000814] min-h-screen font-inter'>
      <Navbar />

      {showSideBar && (
        <>
          {/* Dark overlay — tap to close */}
          <div
            onClick={() => dispatch(setShowSideBar(false))}
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300
        ${showSideBar ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          />

          {/* Sidebar — always in DOM, slides in/out */}
          <div
            className={`fixed left-0 top-0 h-full w-[70%] md:hidden
        text-[#838894] text-sm bg-[#161D29] z-50 overflow-y-auto
        transition-transform duration-300 ease-in-out
        ${showSideBar ? 'translate-x-0' : '-translate-x-full'}`}
          >
            <Sidebar />
          </div>
        </>
      )}

      {/* ❌ DELETE the old absolute sidebar block that was here */}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/catalog' element={<Catelog />} />
        <Route path='/catalog/course-details' element={<CourseDetails />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/reset-password/:token' element={<SetNewPassword />} />
        <Route path='/otp-verification' element={<OtpVerification />} />
        <Route path='/contact-us' element={<ContactUs />} />
        {token && (
          <Route path='/profile/enrolled-courses/view-course' element={<ViewEnrolledCourse />} />
        )}
        {token && (
          <Route path='/profile' element={<Dashboard />}>
            <Route path='my-profile' element={<Profile />} />
            <Route path='setting' element={<Setting />} />
            <Route path='enrolled-courses' element={<EnrolledCourses />} />
            <Route path='wishlist' element={<Wishlist />} />
            <Route path='purchase-history' element={<PurchaseHistory />} />
            <Route path='instructor-courses' element={<InstructorCourses />} />
            <Route path='instructor-courses/create-new-course' element={<CreateNewCourse />} />
          </Route>
        )}
      </Routes>
    </div>
  )
}

export default App;
