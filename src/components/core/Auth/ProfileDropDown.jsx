import React from "react"
import { useSelector } from "react-redux";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoLogOutSharp } from "react-icons/io5";
import { useLogOutHook } from "../../../services/operations/operations";

const ProfileDropDown = (props) => {

  const logOut = useLogOutHook()
  const {user} = useSelector((state) => state.profile)
  const imageUrl = user.image
  console.log("Image url is: ",imageUrl)

  function logOutHandler() {
    logOut()
  }

  return (
    <div className="group relative">
      <div className="flex items-center gap-1 ">
        <img className="w-7 rounded-full" src={imageUrl}></img>
        <IoMdArrowDropdown  />
      </div>
      <div className="absolute flex flex-col gap-1 bg-[#1e1d1d] rounded-sm right-0 top-9 invisible 
       transition-all duration-100 group-hover:visible">
        <Link to={"/dashboard"} className="flex items-center gap-1 hover:bg-[#343434] py-1 px-2" >
        <MdDashboard/>
        Dashsboard
        </Link>
        <Link  onClick={logOutHandler} className="flex items-center gap-1 hover:bg-[#343434] py-1 px-2" >
        <IoLogOutSharp/>
        Logout
        </Link>
      </div>
    </div>
  )
};

export default ProfileDropDown;
