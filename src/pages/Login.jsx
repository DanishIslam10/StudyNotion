import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useLoginHook } from "../services/operations/operations";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

const Login = (props) => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [seePassword, setSeePassword] = useState(false)

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
    login({ ...formData, accountType })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 text-white">
      <div className="w-full max-w-md">

        {/* LOGIN CARD */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">

          {/* Subtle top accent line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

          <div className="p-7 sm:p-9">

            {/* BADGE */}
            <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-4 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <p className="text-xs font-medium text-indigo-300">
                Continue your learning journey
              </p>
            </div>

            {/* HEADING */}
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent tracking-tight ">
              Welcome Back
            </h1>
            <p className="mt-2 mb-7 text-sm sm:text-base leading-relaxed text-slate-400">
              Build skills for today, tomorrow, and beyond.
              Education to future-proof your career.
            </p>

            {/* ACCOUNT TYPE TOGGLE */}
            <div className="mb-7 flex gap-2 rounded-2xl border border-white/10 bg-[#060d1a] p-1">
              <button
                onClick={() => setAccountType("Student")}
                className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200
              ${accountType === "Student"
                    ? "bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] text-black shadow-lg"
                    : "text-slate-400 hover:bg-[#0D1526]"
                  }`}
              >
                Student
              </button>
              <button
                onClick={() => setAccountType("Instructor")}
                className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200
              ${accountType === "Instructor"
                    ? "bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] text-black shadow-lg"
                    : "text-slate-400 hover:bg-[#0D1526]"
                  }`}
              >
                Instructor
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={formSubmitHandler} className="flex flex-col gap-5">

              {/* EMAIL */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-300">
                  Email Address
                </label>
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

              {/* PASSWORD */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={seePassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    name="password"
                    value={formData?.password}
                    onChange={formDataChangeHandler}
                    className="w-full rounded-2xl border border-white/10 bg-[#111c35] px-4 py-3 pr-12 text-white outline-none transition-all duration-200 placeholder:text-slate-600 focus:border-indigo-500/60 focus:bg-[#152040] focus:ring-1 focus:ring-indigo-500/30"
                  />
                  <button
                    type="button"
                    onClick={() => setSeePassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 transition-colors duration-200"
                  >
                    {seePassword
                      ? <IoEyeOffOutline className="text-xl" />
                      : <IoEyeOutline className="text-xl" />
                    }
                  </button>
                </div>

                {/* FORGOT PASSWORD */}
                <div className="flex justify-end mt-1">
                  <Link to={"/reset-password"}>
                    <p className="text-sm font-medium text-[#e2e2e2] hover:underline transition-colors duration-200">
                      Forgot password?
                    </p>
                  </Link>
                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="mt-1 w-full rounded-2xl bg-[#000814]  py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.99]"
              >
                Sign In
              </button>
            </form>

            {/* SIGN UP LINK */}
            <p className="mt-6 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link to={"/signup"} className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
                Sign up
              </Link>
            </p>

            {/* FOOTER NOTE */}
            <div className="mt-6 flex items-center justify-center gap-2 border-t border-white/[0.08] pt-5">
              <svg className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-xs text-slate-500">Secured with end-to-end encryption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login;
