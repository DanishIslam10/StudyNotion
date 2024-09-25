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
        getResetPasswordUrl(email,setEmailSent)
    }

    return (
        <div className="w-full flex justify-center my-auto">
            {
                emailSent ? (
                    <div className="flex flex-col text-white lg:w-[35%] md:w-[40%] sm:w-[50%] w-[80%]">
                        <div className="flex flex-col gap-2">
                            <p className="text-3xl font-[600] text-[rgba(241,242,255,1)] ">Check email</p>
                            <p className="text-base font-[400] text-[rgba(175,178,191,1)]">We have sent the reset email to {email} </p>
                        </div>
                        <button className="bg-[rgba(255,214,10,1)] text-black py-3 rounded-md font-[600] my-8 ">Resend email</button>
                        <Link to={"/login"} >
                            <button className="w-fit flex items-center gap-1 text-[rgba(241,242,255,1)]
                                  transition-all duration-200 hover:scale-105">
                                <FaArrowLeftLong />
                                <p>Back to login</p>
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        {
                            loading ? (
                                <Spinner/>
                            ) : (
                                <div className="flex flex-col gap-4 text-white lg:w-[35%] md:w-[40%] sm:w-[50%] w-[80%] ">
                                    <p className="text-3xl font-[600] text-[rgba(241,242,255,1)] ">Reset your password</p>
                                    <p className="text-base font-[400] text-[rgba(175,178,191,1)] ">Have no fear. We’ll email you instructions to reset your password.
                                        If you dont have access to your email we can try account recovery</p>
                                    <form onSubmit={formSubmitHandler} className="inputs flex flex-col">
                                        <label className="text-sm font-[400] my-1 text-[rgba(241,242,255,1)] ">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="Enter email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <button className="bg-[rgba(255,214,10,1)] text-black py-3 rounded-md font-[600] my-8 ">Reset Password</button>
                                        <Link to={"/login"} >
                                            <button className="w-fit flex items-center gap-1 text-[rgba(241,242,255,1)]
                                  transition-all duration-200 hover:scale-105">
                                                <FaArrowLeftLong />
                                                <p>Back to login</p>
                                            </button>
                                        </Link>
                                    </form>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
};

export default ResetPassword;
