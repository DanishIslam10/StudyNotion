import React, { useEffect, useState } from "react";
import signUpImage from "../assets/Images/signup.webp";
import signUpImageFrame from "../assets/Images/frame.png";
import { useDispatch, useSelector } from "react-redux";
import { setSignUpData } from "../slices/authSlice";
import { useSendSignUpOtpHook } from "../services/operations/operations"
import Spinner from "../components/common/Spinner"
import DobInput from "../components/common/DobInput";
import GenderInput from "../components/common/GenderInput"
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

const SignUp = (props) => {
  
  const { signUpData, loading } = useSelector((state) => state.auth);

  console.log("Sign Up Data in Sign up component: ", signUpData)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    password: "",
    confirmPassword: "",
    accountType: "Student", // Move the accountType here
  });

  const [seePassword, setSeePassword] = useState(false)
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false)

  function formDataChangeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const dispatch = useDispatch();

  const sendSignUpOtp = useSendSignUpOtpHook()

  function formSubmitHandler(event) {
    event.preventDefault();
    dispatch(setSignUpData(formData));
    console.log("sign up form Data", formData)
    sendSignUpOtp(formData);
  }

  function handleAccountTypeChange(accountType) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      accountType, // Update accountType correctly here
    }));
  }

  return (
    <div className="flex w-full justify-center my-auto ">
      {
        loading ? (
          <Spinner />
        ) : (
          <div className="w-[85%] flex md:flex-row flex-col-reverse justify-evenly items-center my-8 md:gap-0 gap-10">
            {/* left side */}
            <div className="md:w-[40%] flex flex-col gap-4 text-white">
              <div className="flex flex-col gap-4">
                <p className="text-3xl text-[rgba(241,242,255,1)] font-[600]">
                  Join the millions learning to code with StudyNotion for free
                </p>
                <p className="text-base font-[700] text-[rgba(175,178,191,1)]">
                  Build skills for today, tomorrow, and beyond. Education to
                  future-proof your career.
                </p>
              </div>
              <div className="flex gap-4 bg-[rgba(22,29,41,1)] w-fit py-1 px-4 rounded-full">
                <button
                  className={`${formData.accountType === "Student" && "bg-[rgba(0,8,20,1)] py-1 px-2 rounded-full"
                    }`}
                  onClick={() => handleAccountTypeChange("Student")}
                >
                  Student
                </button>
                <button
                  className={`${formData.accountType === "Instructor" && "bg-[rgba(0,8,20,1)] py-1 px-2 rounded-full"
                    }`}
                  onClick={() => handleAccountTypeChange("Instructor")}
                >
                  Instructor
                </button>
              </div>
              {/* form */}
              <form onSubmit={formSubmitHandler} className="sign-up-form w-full flex flex-col gap-4">
                <div className="flex gap-2">
                  <div className="w-full">
                    <label>First Name</label>
                    <input
                      type="text"
                      placeholder="Enter first name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={formDataChangeHandler}
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label>Last Name</label>
                    <input
                      type="text"
                      placeholder="Enter last name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={formDataChangeHandler}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    name="email"
                    value={formData.email}
                    onChange={formDataChangeHandler}
                    required
                  />
                </div>
                <DobInput name={"dateOfBirth"} value={formData.dateOfBirth} onChange={formDataChangeHandler} />
                <GenderInput name={"gender"} value={formData.gender} onChange={formDataChangeHandler} />
                <div className="flex gap-2">
                  <div className="w-full">
                    <label>Create Password</label>
                    <div className='relative flex items-center' >
                      <input
                        className='bg-[#2C333F]  py-[0.6rem] px-[0.4rem] rounded-md '
                        type={seePassword ? 'text' : 'password'}
                        placeholder="Enter Password"
                        required={true}
                        name='password'
                        value={formData?.password}
                        onChange={formDataChangeHandler}
                      />
                      <div className='absolute right-2 text-lg text-white ' >
                        {
                          seePassword ? (
                            (
                              <IoEyeOffOutline
                                onClick={() => setSeePassword((prev) => !prev)} />
                            )
                          ) : (
                            <IoEyeOutline
                              onClick={() => setSeePassword((prev) => !prev)} />
                          )
                        }
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <label>Confirm Password</label>
                    <div className='relative flex items-center' >
                      <input
                        className='bg-[#2C333F]  py-[0.6rem] px-[0.4rem] rounded-md '
                        type={seeConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        required={true}
                        name='confirmPassword'
                        value={formData?.confirmPassword}
                        onChange={formDataChangeHandler}
                      />
                      <div className='absolute right-2 text-lg text-white ' >
                        {
                          seeConfirmPassword ? (
                            (
                              <IoEyeOffOutline
                                onClick={() => setSeeConfirmPassword((prev) => !prev)} />
                            )
                          ) : (
                            <IoEyeOutline
                              onClick={() => setSeeConfirmPassword((prev) => !prev)} />
                          )
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <button className="bg-[rgba(255,214,10,1)] text-black py-3 rounded-md font-[600]">
                  Create Account
                </button>
              </form>
            </div>
            {/* right side */}
            <div className="relative flex justify-evenly items-start">
              <img
                src={signUpImage}
                className="object-contain md:w-[80%] w-[80%] mt-4 z-10"
                alt="Sign Up"
              />
              <img
                src={signUpImageFrame}
                className="absolute z-0 object-contain md:w-[80%] w-[80%] top-[7%] right-[7%]"
                alt="Sign Up Frame"
              />
            </div>
          </div>
        )
      }
    </div>
  );
};

export default SignUp;
