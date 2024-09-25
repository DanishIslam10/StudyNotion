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

function App() {
  return (
    <div className='flex flex-col bg-[#000814] min-h-screen font-inter'>
      <Navbar/>
      <Routes>
        <Route path='/' element = {<Home/>} ></Route>
        <Route path='/signup' element = {<SignUp/>} ></Route>
        <Route path='/login' element = {<Login/>} ></Route>
        <Route path='/reset-password' element = {<ResetPassword/>} ></Route>
        <Route path='/reset-password/:token' element = {<SetNewPassword/>} ></Route>
        <Route path='/otp-verification' element = {<OtpVerification/>} ></Route>
        <Route path='/about' element = {<About/>} ></Route>
      </Routes>
    </div>
  );
}

export default App;
