import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSignUpData } from "../slices/authSlice";
import { useSendSignUpOtpHook } from "../services/operations/operations"
import DobInput from "../components/common/DobInput";
import GenderInput from "../components/common/GenderInput"
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center px-4 py-10 text-white">
      <div className="w-full max-w-2xl">

        {/* SIGNUP CARD */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">

          {/* Top accent line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

          <div className="p-7 sm:p-9">

            {/* BADGE */}
            <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-4 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <p className="text-xs font-medium text-indigo-300">
                Start your coding journey today
              </p>
            </div>

            {/* HEADING */}
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent tracking-tight leading-tight">
              Join millions learning to code
            </h1>
            <p className="mt-2 mb-7 text-sm sm:text-base leading-relaxed text-slate-400">
              Build skills for today, tomorrow, and beyond.
              Education to future-proof your career.
            </p>

            {/* ACCOUNT TYPE TOGGLE */}
            <div className="mb-7 flex gap-2 rounded-2xl border border-white/10 bg-[#060d1a] p-1">
              <button
                onClick={() => handleAccountTypeChange("Student")}
                className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200
              ${formData.accountType === "Student"
                    ? "bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] text-black shadow-lg"
                    : "text-slate-400 hover:text-white hover:bg-[#0d1526]"
                  }`}
              >
                Student
              </button>
              <button
                onClick={() => handleAccountTypeChange("Instructor")}
                className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200
              ${formData.accountType === "Instructor"
                    ? "bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] text-black shadow-lg"
                    : "text-slate-400 hover:text-white hover:bg-[#0d1526]"
                  }`}
              >
                Instructor
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={formSubmitHandler} className="flex flex-col gap-5">

              {/* NAME FIELDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-300">First Name</label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={formDataChangeHandler}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-[#111c35] px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-slate-600 focus:border-indigo-500/60 focus:bg-[#152040] focus:ring-1 focus:ring-indigo-500/30"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-300">Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={formDataChangeHandler}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-[#111c35] px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-slate-600 focus:border-indigo-500/60 focus:bg-[#152040] focus:ring-1 focus:ring-indigo-500/30"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-300">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={formDataChangeHandler}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-[#111c35] px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-slate-600 focus:border-indigo-500/60 focus:bg-[#152040] focus:ring-1 focus:ring-indigo-500/30"
                />
              </div>

              {/* DOB + GENDER */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-300">Date of Birth</label>
                  <div className="rounded-2xl border border-white/10 bg-[#111c35] px-4 py-3 transition-all duration-200 focus-within:border-indigo-500/60 focus-within:bg-[#152040] focus-within:ring-1 focus-within:ring-indigo-500/30">
                    <DobInput
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={formDataChangeHandler}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-300">Gender</label>
                  <div className="rounded-2xl border border-white/10 bg-[#111c35] px-4 py-3 transition-all duration-200 focus-within:border-indigo-500/60 focus-within:bg-[#152040] focus-within:ring-1 focus-within:ring-indigo-500/30">
                    <GenderInput
                      name="gender"
                      value={formData.gender}
                      onChange={formDataChangeHandler}
                    />
                  </div>
                </div>
              </div>

              {/* PASSWORDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* CREATE PASSWORD */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-300">Create Password</label>
                  <div className="relative">
                    <input
                      type={seePassword ? "text" : "password"}
                      placeholder="Enter password"
                      required
                      name="password"
                      value={formData?.password}
                      onChange={formDataChangeHandler}
                      className="w-full rounded-2xl border border-white/10 bg-[#111c35] px-4 py-3 pr-12 text-white outline-none transition-all duration-200 placeholder:text-slate-600 focus:border-indigo-500/60 focus:bg-[#152040] focus:ring-1 focus:ring-indigo-500/30"
                    />
                    <button
                      type="button"
                      onClick={() => setSeePassword(prev => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 transition-colors duration-200"
                    >
                      {seePassword ? <IoEyeOffOutline className="text-xl" /> : <IoEyeOutline className="text-xl" />}
                    </button>
                  </div>
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-300">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={seeConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      required
                      name="confirmPassword"
                      value={formData?.confirmPassword}
                      onChange={formDataChangeHandler}
                      className="w-full rounded-2xl border border-white/10 bg-[#111c35] px-4 py-3 pr-12 text-white outline-none transition-all duration-200 placeholder:text-slate-600 focus:border-indigo-500/60 focus:bg-[#152040] focus:ring-1 focus:ring-indigo-500/30"
                    />
                    <button
                      type="button"
                      onClick={() => setSeeConfirmPassword(prev => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 transition-colors duration-200"
                    >
                      {seeConfirmPassword ? <IoEyeOffOutline className="text-xl" /> : <IoEyeOutline className="text-xl" />}
                    </button>
                  </div>

                  {/* MATCH INDICATOR */}
                  {formData?.confirmPassword?.length > 0 && (
                    <div className={`flex items-center gap-1.5 text-xs font-medium transition-all duration-200
                  ${formData.password === formData.confirmPassword ? "text-[#a6ff5e]" : "text-red-400"}`}>
                      {formData.password === formData.confirmPassword ? (
                        <>
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          Passwords match
                        </>
                      ) : (
                        <>
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Passwords don't match
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="mt-1 w-full rounded-2xl bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] py-3.5 text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.99]"
              >
                Create Account
              </button>
            </form>

            {/* LOGIN LINK */}
            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link to={"/login"} className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
                Sign in
              </Link>
            </p>

            {/* FOOTER */}
            <div className="mt-6 flex items-center justify-center gap-2 border-t border-white/[0.08] pt-5">
              <svg className="h-3.5 w-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-xs text-slate-600">Secured with end-to-end encryption</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
