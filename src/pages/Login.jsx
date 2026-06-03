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
    <div className="min-h-screen flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md">

        {/* LOGIN CARD */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

          {/* Gradient Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-cyan-500/10"></div>

          <div className="relative p-6 sm:p-8">

            {/* TOP CONTENT */}
            <div className="mb-8 flex flex-col gap-4">

              {/* Small Badge */}
              <div className="flex w-fit items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-1">
                <div className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></div>

                <p className="text-xs font-medium text-indigo-300">
                  Continue your learning journey
                </p>
              </div>

              {/* Heading */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  Welcome Back
                </h1>

                <p className="text-sm sm:text-base leading-relaxed text-[#9CA3AF]">
                  Build skills for today, tomorrow, and beyond.
                  Education to future-proof your career.
                </p>
              </div>
            </div>

            {/* ACCOUNT TYPE TOGGLE */}
            <div className="mb-8 flex rounded-2xl border border-white/10 bg-[#000000] p-1">

              <button
                onClick={() => setAccountType("Student")}
                className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300
              ${accountType === "Student"
                    ? "bg-[#2a2a32] text-white shadow-lg"
                    : "text-[#9CA3AF] hover:text-white"
                  }`}
              >
                Student
              </button>

              <button
                onClick={() => setAccountType("Instructor")}
                className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300
              ${accountType === "Instructor"
                    ? "bg-[#2a2a32] text-white shadow-lg"
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

              {/* PASSWORD */}
              <div className="flex flex-col gap-2">

                <label className="text-sm font-medium text-[#E5E7EB]">
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
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white outline-none backdrop-blur-lg transition-all duration-300 placeholder:text-[#6B7280] focus:border-indigo-400/40 focus:bg-white/[0.07]"
                  />

                  {/* TOGGLE ICON */}
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

                {/* FORGOT PASSWORD */}
                <div className="flex justify-end">
                  <Link to={"/reset-password"}>
                    <p className="text-sm font-medium text-cyan-400 transition-colors duration-300 hover:text-cyan-300">
                      Forgot Password?
                    </p>
                  </Link>
                </div>
              </div>

              {/* SIGN IN BUTTON */}
              <button
                className="mt-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-indigo-500/30"
              >
                Sign In
              </button>
            </form>

            {/* BOTTOM TEXT */}
            <div className="mt-8 text-center">
              <p className="text-sm text-[#6B7280]">
                Secure authentication powered by modern encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login;
