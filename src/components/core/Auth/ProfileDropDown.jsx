import React from "react"
import { useSelector } from "react-redux";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoLogOutSharp } from "react-icons/io5";
import { useLogOutHook } from "../../../services/operations/operations";

const ProfileDropDown = (props) => {

  const logOut = useLogOutHook()
  const { user } = useSelector((state) => state.profile)
  const imageUrl = user.image

  function logOutHandler() {
    logOut()
  }

  return (
    <div className="group relative">
      <div className="flex items-center gap-1 ">
        <div className="bg-[black] rounded-full">
          <img className="w-[2rem] h-[2rem] object-cover object-top rounded-full " src={user?.image} alt="profile picture" />
        </div>
        <IoMdArrowDropdown />
      </div>
      <div className="invisible absolute flex flex-col gap-1 bg-[#1e1d1d] rounded-sm right-0 top-9
       transition-all duration-200 group-hover:visible">
        <Link to={"/profile/my-profile"} className="flex items-center gap-1 hover:bg-[#343434] py-1 px-2" >
          <MdDashboard />
          Dashboard
        </Link>
        <Link onClick={logOutHandler} className="flex items-center gap-1 hover:bg-[#343434] py-1 px-2" >
          <IoLogOutSharp />
          Logout
        </Link>
      </div>
    </div>
  )
};

export default ProfileDropDown;
