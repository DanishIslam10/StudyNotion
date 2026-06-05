import React, { useState } from "react"
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useResetPasswordUrlHook } from "../services/operations/operations";
import Spinner from "../components/common/Spinner"

const ResetPassword = (props) => {

    const getResetPasswordUrl = useResetPasswordUrlHook()

    const [emailSent, setEmailSent] = useState(false)
    const { loading } = useSelector((state) => state.auth)
    const [email, setEmail] = useState("")

    function formSubmitHandler(event) {
        event.preventDefault()
        getResetPasswordUrl(email, setEmailSent)
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10 text-white">
            <div className="w-full max-w-md">

                {emailSent ? (

                    /* ── EMAIL SENT STATE ── */
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
                        <div className="h-[2px] w-full bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]" />

                        <div className="p-7 sm:p-9">

                            {/* ICON */}
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#111c35]">
                                <svg className="h-7 w-7 text-[#a6ff5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </div>

                            {/* BADGE */}
                            <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-4 py-1.5">
                                <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                                <p className="text-xs font-medium text-indigo-300">Email sent successfully</p>
                            </div>

                            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent tracking-tight">
                                Check your email
                            </h1>
                            <p className="mt-2 mb-8 text-sm sm:text-base leading-relaxed text-slate-400">
                                We've sent password reset instructions to{" "}
                                <span className="font-semibold text-slate-200">{email}</span>
                            </p>

                            {/* RESEND BUTTON */}
                            <button className="w-full rounded-2xl bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] py-3.5 text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.99]">
                                Resend email
                            </button>

                            {/* DIVIDER */}
                            <div className="my-6 border-t border-white/[0.08]" />

                            {/* BACK TO LOGIN */}
                            <Link to={"/login"}>
                                <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#111c35] py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-[#152040] hover:text-white">
                                    <FaArrowLeftLong className="text-xs" />
                                    Back to login
                                </button>
                            </Link>
                        </div>
                    </div>

                ) : (

                    /* ── RESET FORM STATE ── */
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
                        <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

                        <div className="p-7 sm:p-9">

                            {loading ? (
                                <div className="flex items-center justify-center py-16">
                                    <Spinner />
                                </div>
                            ) : (
                                <>
                                    {/* ICON */}
                                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#111c35]">
                                        <svg className="h-7 w-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                        </svg>
                                    </div>

                                    {/* BADGE */}
                                    <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-4 py-1.5">
                                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                                        <p className="text-xs font-medium text-indigo-300">Password recovery</p>
                                    </div>

                                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent tracking-tight">
                                        Reset your password
                                    </h1>
                                    <p className="mt-2 mb-7 text-sm sm:text-base leading-relaxed text-slate-400">
                                        No worries — enter your email and we'll send you instructions to reset your password.
                                    </p>

                                    {/* FORM */}
                                    <form onSubmit={formSubmitHandler} className="flex flex-col gap-5">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium text-slate-300">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="w-full rounded-2xl border border-white/10 bg-[#111c35] px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-slate-600 focus:border-indigo-500/60 focus:bg-[#152040] focus:ring-1 focus:ring-indigo-500/30"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full rounded-2xl bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] py-3.5 text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.99]"
                                        >
                                            Send reset instructions
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
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default ResetPassword;
