import React, { useState } from "react"
import { useNavigate, useParams } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useResetYourPasswordHook } from "../services/operations/operations";

const SetNewPassword = (props) => {

  const [newPassword,setNewPassword] = useState("")
  const [confirmNewPassword,setConfirmNewPassword] = useState("")
  const {token} = useParams()
  const resetYourPassword = useResetYourPasswordHook()

  function formSubmitHandler(e) {
    e.preventDefault()
    resetYourPassword({newPassword,confirmNewPassword,token})
  }

  return (
    <div className="w-full flex justify-center my-auto">
      <div className="flex flex-col gap-4 text-white lg:w-[35%] md:w-[40%] sm:w-[50%] w-[80%] ">
                        <p className="text-3xl font-[600] text-[rgba(241,242,255,1)] ">Choose new password</p>
                        <p className="text-base font-[400] text-[rgba(175,178,191,1)] ">Almost done. Enter your new password and youre all set.</p>
                        <form onSubmit={formSubmitHandler} className="inputs flex flex-col">
                            <label className="text-sm font-[400] my-1 text-[rgba(241,242,255,1)] ">New password</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                requires = {true}
                            />
                            <label className="text-sm font-[400] my-1 text-[rgba(241,242,255,1)] ">Confirm new password</label>
                            <input
                                type="password"
                                name="confirmNewPassword"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                requires = {true}
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
    </div>
  )
};

export default SetNewPassword;
