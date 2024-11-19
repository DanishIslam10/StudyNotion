import React, { useState } from "react"
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { useSendSignUpOtpHook, useSignUpHook } from "../services/operations/operations";
import { Navigate } from "react-router";
import { setUser } from "../slices/profileSlice";
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
            <div className="flex min-h-[80%] min-w-full justify-center items-center my-auto " >
                <Spinner />
            </div>
        ) : (
            <div className="flex justify-center w-full my-auto">
                <div className="flex flex-col gap-4 text-white lg:w-[24%] md:w-[30%] sm:w-[40%] w-[80%]">
                    <p className="text-3xl font-[600] text-[rgba(241,242,255,1)] ">Verify Email</p>
                    <p className=" text-base font-[400] text-[rgba(175,178,191,1)] ">A verification code has been sent to you. Enter the code below</p>
                    <form onSubmit={formSubmitHandler} >
                        {
                            !resendSignUpOtp &&
                            <div className="w-fit">
                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props) => <input {...props} />}
                                    inputStyle={{
                                        width: "3rem",
                                        height: "3rem",
                                        borderRadius: "0.5rem",
                                        backgroundColor: "rgba(22,29,41,1)",
                                        color: "white",

                                    }}
                                    focusStyle={{
                                        border: "2px solid #4CAF50",
                                    }}
                                />
                            </div>
                        }
                        {
                            resendSignUpOtp ? (
                                <button
                                    type="button"
                                    onClick={resendOtpHandler}
                                    className="w-full bg-[#424242] hover:bg-[#252525] text-[#ffffff] py-3 rounded-md font-[600] my-4">
                                    Resend OTP
                                </button>
                            ) : (
                                <button type="submit" className="w-full bg-[#ffee2d] text-black py-3 rounded-md font-[600] my-4">
                                    Verify Email
                                </button>
                            )
                        }
                    </form>
                </div>
            </div>
        )
    )
};

export default OtpVerification;
