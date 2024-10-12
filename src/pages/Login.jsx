import React, { useState } from "react"
import loginImage from "../assets/Images/login.webp"
import signUpImageFrame from "../assets/Images/frame.png"
import { Link} from "react-router-dom";
import { useLoginHook } from "../services/operations/operations";
import { useSelector } from "react-redux";

const Login = (props) => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const login = useLoginHook()

  const [accountType, setAccountType] = useState("Student")

  function formDataChangeHandler(event) {
    const { name, value } = event.target
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  function formSubmitHandler(event) {
    event.preventDefault()
    login({...formData,accountType})
  }

  return (
    <div className="flex justify-center ">
      <div className="w-[85%] flex md:flex-row flex-col-reverse justify-evenly items-center my-8 md:gap-0 gap-10">
        {/* left side */}
        <div className="md:w-[35%] flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <p className="text-3xl text-[rgba(241,242,255,1)] font-[600] ">Welcome Back</p>
            <p className="text-base font-[700] text-[rgba(175,178,191,1)] ">Build skills for today, tomorrow, and beyond. Education to future-proof your career.</p>
          </div>
          <div className="flex gap-4 bg-[rgba(22,29,41,1)] w-fit py-1 px-4 rounded-full text-white ">
            <button
              className={`${accountType === "Student" && "bg-[rgba(0,8,20,1)] py-1 px-2 rounded-full"}`}
              onClick={() => setAccountType("Student")} >
              Student
            </button>
            <button className={`${accountType === "Instructor" && "bg-[rgba(0,8,20,1)] py-1 px-2 rounded-full"}`}
              onClick={() => setAccountType("Instructor")}>
              Instructor
            </button>
          </div>
          {/* form */}
          <form onSubmit={formSubmitHandler} className="login-form w-full flex flex-col gap-4">
            <div>
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter email address"
                name="email"
                value={formData.email}
                onChange={formDataChangeHandler}
                required = {true}
              />
            </div>
            <div className="w-full">
              <label>Enter Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={formDataChangeHandler}
                required = {true}
              />
              <div className="flex justify-end my-2">
                <Link to={"/reset-password"}>
                  <p className="text-[rgba(71,165,197,1)] text-xs hover:text-[#4dd1fd]"> Forget Password </p>
                </Link>
              </div>
            </div>
            <button className="bg-[rgba(255,214,10,1)] text-black py-3 rounded-md font-[600] "> Sign in </button>
          </form>
        </div>
        {/* right side */}
        <div className="relative flex justify-evenly items-start">
          <img src={loginImage} className="object-contain md:w-[80%] w-[80%] mt-4 z-10" ></img>
          <img src={signUpImageFrame} className="absolute z-0  object-contain md:w-[80%] w-[80%] top-[8%] right-[12%] "></img>
        </div>
      </div>
    </div>
  )
};

export default Login;
