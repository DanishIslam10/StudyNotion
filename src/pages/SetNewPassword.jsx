import React, { useState } from "react"
import { useParams } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useResetYourPasswordHook } from "../services/operations/operations";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

const SetNewPassword = (props) => {

  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const { token } = useParams()
  const resetYourPassword = useResetYourPasswordHook()


  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  function formSubmitHandler(e) {
    e.preventDefault()
    resetYourPassword({ newPassword, confirmNewPassword, token })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 text-white">
      <div className="w-full max-w-md">

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">

          {/* Top accent line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

          <div className="p-7 sm:p-9">

            {/* ICON */}
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#111c35]">
              <svg className="h-7 w-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>

            {/* BADGE */}
            <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-4 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <p className="text-xs font-medium text-indigo-300">Almost there</p>
            </div>

            {/* HEADING */}
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent tracking-tight">
              Choose new password
            </h1>
            <p className="mt-2 mb-7 text-sm sm:text-base leading-relaxed text-slate-400">
              Almost done. Enter your new password and you're all set.
            </p>

            {/* FORM */}
            <form onSubmit={formSubmitHandler} className="flex flex-col gap-5">

              {/* NEW PASSWORD */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-300">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    name="newPassword"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-[#111c35] px-4 py-3 pr-12 text-white outline-none transition-all duration-200 placeholder:text-slate-600 focus:border-indigo-500/60 focus:bg-[#152040] focus:ring-1 focus:ring-indigo-500/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(prev => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 transition-colors duration-200"
                  >
                    {showNew ? <IoEyeOffOutline className="text-xl" /> : <IoEyeOutline className="text-xl" />}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-300">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmNewPassword"
                    placeholder="Re-enter new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-[#111c35] px-4 py-3 pr-12 text-white outline-none transition-all duration-200 placeholder:text-slate-600 focus:border-indigo-500/60 focus:bg-[#152040] focus:ring-1 focus:ring-indigo-500/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(prev => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 transition-colors duration-200"
                  >
                    {showConfirm ? <IoEyeOffOutline className="text-xl" /> : <IoEyeOutline className="text-xl" />}
                  </button>
                </div>

                {/* MATCH INDICATOR */}
                {confirmNewPassword.length > 0 && (
                  <div className={`flex items-center gap-1.5 text-xs font-medium transition-all duration-200
                ${newPassword === confirmNewPassword ? "text-[#a6ff5e]" : "text-red-400"}`}>
                    {newPassword === confirmNewPassword ? (
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

              {/* SUBMIT */}
              <button
                type="submit"
                className="mt-1 w-full rounded-2xl bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] py-3.5 text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.99]"
              >
                Reset Password
              </button>
            </form>

            {/* DIVIDER */}
            <div className="my-6 border-t border-white/[0.08]" />

            {/* BACK TO LOGIN */}
            <Link to={"/login"}>
              <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#111c35] py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-[#152040] hover:text-white">
                <FaArrowLeftLong className="text-xs" />
                Back to login
              </button>
            </Link>

            {/* FOOTER */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <svg className="h-3.5 w-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-xs text-slate-600">Secured with end-to-end encryption</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
};

export default SetNewPassword;
