import React, { useState } from "react"
import OTPInput from "react-otp-input";
import { useSelector } from "react-redux";
import { useSendSignUpOtpHook, useSignUpHook } from "../services/operations/operations";
import { Navigate } from "react-router";
import Spinner from "../components/common/Spinner";

const OtpVerification = (props) => {

    let [otp, setOtp] = useState("")
    const { signUpData, loading, resendSignUpOtp } = useSelector((state) => state.auth)
    const signUp = useSignUpHook()
    const sendSignUpOtp = useSendSignUpOtpHook()

    if (!signUpData) {
        return <Navigate to={"/signup"} replace />
    }

    otp = Number(otp)

    function formSubmitHandler(event) {
        event.preventDefault()
        const { firstName, lastName, email, dateOfBirth, gender, accountType, password, confirmPassword } = signUpData
        // console.log("All sign Data : ",
        //     firstName,lastName,email,accountType,password,confirmPassword,otp
        // )
        signUp({ firstName, lastName, email, dateOfBirth, gender, accountType, password, confirmPassword, otp })
    }


    function resendOtpHandler() {
        console.log("sign up data to resend otp:", signUpData)
        setOtp(null)
        sendSignUpOtp(signUpData)
    }

    return (
        loading ? (
            <div className="flex min-h-screen w-full items-center justify-center">
                <Spinner />
            </div>
        ) : (
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
                                <p className="text-xs font-medium text-indigo-300">Check your email</p>
                            </div>

                            {/* HEADING */}
                            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent tracking-tight">
                                Verify your email
                            </h1>
                            <p className="mt-2 mb-8 text-sm sm:text-base leading-relaxed text-slate-400">
                                A 6-digit verification code has been sent to your email address. Enter it below to continue.
                            </p>

                            <form onSubmit={formSubmitHandler} className="flex flex-col gap-6">

                                {/* OTP INPUT */}
                                {!resendSignUpOtp && (
                                    <div className="flex flex-col gap-3">
                                        <label className="text-sm font-medium text-slate-300">
                                            Verification Code
                                        </label>
                                        <OTPInput
                                            value={otp}
                                            onChange={setOtp}
                                            numInputs={6}
                                            renderSeparator={
                                                <span className="text-slate-700 text-lg font-light mx-0.5">–</span>
                                            }
                                            renderInput={(props) => <input {...props} />}
                                            containerStyle={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "6px",
                                                width: "100%",
                                            }}
                                            inputStyle={{
                                                flex: 1,
                                                minWidth: 0,
                                                height: "52px",
                                                borderRadius: "14px",
                                                border: "1px solid rgba(255,255,255,0.10)",
                                                backgroundColor: "#111c35",
                                                color: "white",
                                                fontSize: "20px",
                                                fontWeight: "600",
                                                textAlign: "center",
                                                outline: "none",
                                                transition: "all 0.2s",
                                            }}
                                            focusStyle={{
                                                border: "1px solid rgba(99,102,241,0.6)",
                                                backgroundColor: "#152040",
                                                boxShadow: "0 0 0 3px rgba(99,102,241,0.15)",
                                            }}
                                        />

                                        {/* PROGRESS DOTS */}
                                        <div className="flex items-center gap-1.5 mt-1">
                                            {Array.from({ length: 6 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`h-1 flex-1 rounded-full transition-all duration-300
                          ${i < otp.length
                                                            ? "bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]"
                                                            : "bg-white/10"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* CTA BUTTON */}
                                {resendSignUpOtp ? (
                                    <button
                                        type="button"
                                        onClick={resendOtpHandler}
                                        className="w-full rounded-2xl border border-white/10 bg-[#111c35] py-3.5 text-sm font-semibold text-slate-300 transition-all duration-200 hover:bg-[#152040] hover:text-white"
                                    >
                                        Resend OTP
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="w-full rounded-2xl bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] py-3.5 text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.99]"
                                    >
                                        Verify Email
                                    </button>
                                )}
                            </form>

                            {/* RESEND HINT */}
                            {!resendSignUpOtp && (
                                <p className="mt-5 text-center text-sm text-slate-500">
                                    Didn't receive the code?{" "}
                                    <button
                                        type="button"
                                        onClick={resendOtpHandler}
                                        className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                                    >
                                        Resend
                                    </button>
                                </p>
                            )}

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
        )
    )
};

export default OtpVerification;
