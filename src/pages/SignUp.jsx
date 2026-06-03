import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSignUpData } from "../slices/authSlice";
import { useSendSignUpOtpHook } from "../services/operations/operations"
import DobInput from "../components/common/DobInput";
import GenderInput from "../components/common/GenderInput"
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

const SignUp = (props) => {

  const { signUpData } = useSelector((state) => state.auth);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B1120] via-[#111827] to-[#0F172A] px-4 py-10">

      <div className="w-full max-w-2xl">

        {/* SIGNUP CARD */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

          {/* Gradient Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-cyan-500/10"></div>

          <div className="relative p-6 sm:p-8">

            {/* TOP SECTION */}
            <div className="mb-8 flex flex-col gap-4">

              {/* Badge */}
              <div className="flex w-fit items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-1">
                <div className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></div>

                <p className="text-xs font-medium text-indigo-300">
                  Start your coding journey today
                </p>
              </div>

              {/* Heading */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  Join millions learning to code with StudyNotion
                </h1>

                <p className="text-sm sm:text-base leading-relaxed text-[#9CA3AF]">
                  Build skills for today, tomorrow, and beyond.
                  Education to future-proof your career.
                </p>
              </div>
            </div>

            {/* ACCOUNT TYPE */}
            <div className="mb-8 flex rounded-2xl border border-white/10 bg-white/5 p-1">

              <button
                onClick={() => handleAccountTypeChange("Student")}
                className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300
              ${formData.accountType === "Student"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                    : "text-[#9CA3AF] hover:text-white"
                  }`}
              >
                Student
              </button>

              <button
                onClick={() => handleAccountTypeChange("Instructor")}
                className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300
              ${formData.accountType === "Instructor"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                    : "text-[#9CA3AF] hover:text-white"
                  }`}
              >
                Instructor
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={formSubmitHandler}
              className="flex flex-col gap-5"
            >

              {/* NAME FIELDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* FIRST NAME */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#E5E7EB]">
                    First Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter first name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={formDataChangeHandler}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none backdrop-blur-lg transition-all duration-300 placeholder:text-[#6B7280] focus:border-indigo-400/40 focus:bg-white/[0.07]"
                  />
                </div>

                {/* LAST NAME */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#E5E7EB]">
                    Last Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter last name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={formDataChangeHandler}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none backdrop-blur-lg transition-all duration-300 placeholder:text-[#6B7280] focus:border-indigo-400/40 focus:bg-white/[0.07]"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#E5E7EB]">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={formDataChangeHandler}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none backdrop-blur-lg transition-all duration-300 placeholder:text-[#6B7280] focus:border-indigo-400/40 focus:bg-white/[0.07]"
                />
              </div>

              {/* DOB + GENDER */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-lg">
                  <DobInput
                    name={"dateOfBirth"}
                    value={formData.dateOfBirth}
                    onChange={formDataChangeHandler}
                  />
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-lg">
                  <GenderInput
                    name={"gender"}
                    value={formData.gender}
                    onChange={formDataChangeHandler}
                  />
                </div>
              </div>

              {/* PASSWORDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* PASSWORD */}
                <div className="flex flex-col gap-2">

                  <label className="text-sm font-medium text-[#E5E7EB]">
                    Create Password
                  </label>

                  <div className="relative">

                    <input
                      type={seePassword ? "text" : "password"}
                      placeholder="Enter password"
                      required
                      name="password"
                      value={formData?.password}
                      onChange={formDataChangeHandler}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white outline-none backdrop-blur-lg transition-all duration-300 placeholder:text-[#6B7280] focus:border-indigo-400/40 focus:bg-white/[0.07]"
                    />

                    <button
                      type="button"
                      onClick={() => setSeePassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-white transition-colors duration-300"
                    >
                      {
                        seePassword ? (
                          <IoEyeOffOutline className="text-xl" />
                        ) : (
                          <IoEyeOutline className="text-xl" />
                        )
                      }
                    </button>
                  </div>
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="flex flex-col gap-2">

                  <label className="text-sm font-medium text-[#E5E7EB]">
                    Confirm Password
                  </label>

                  <div className="relative">

                    <input
                      type={seeConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      required
                      name="confirmPassword"
                      value={formData?.confirmPassword}
                      onChange={formDataChangeHandler}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white outline-none backdrop-blur-lg transition-all duration-300 placeholder:text-[#6B7280] focus:border-indigo-400/40 focus:bg-white/[0.07]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setSeeConfirmPassword((prev) => !prev)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-white transition-colors duration-300"
                    >
                      {
                        seeConfirmPassword ? (
                          <IoEyeOffOutline className="text-xl" />
                        ) : (
                          <IoEyeOutline className="text-xl" />
                        )
                      }
                    </button>
                  </div>
                </div>
              </div>

              {/* CREATE ACCOUNT BUTTON */}
              <button
                className="mt-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-indigo-500/30"
              >
                Create Account
              </button>
            </form>

            {/* FOOTER TEXT */}
            <div className="mt-8 text-center">
              <p className="text-sm text-[#6B7280]">
                Secure signup experience with modern authentication
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
