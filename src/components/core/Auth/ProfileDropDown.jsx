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

      {/* Profile Trigger */}
      <div className="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 backdrop-blur-md transition-all duration-300 hover:bg-white/10">

        <div className="overflow-hidden rounded-full border border-white/10">
          <img
            className="h-9 w-9 object-cover object-top"
            src={user?.image}
            alt="profile picture"
          />
        </div>

        <IoMdArrowDropdown className="text-lg text-[#CBD5E1] transition-transform duration-300 group-hover:rotate-180" />
      </div>

      {/* Dropdown */}
      <div
        className="
            invisible absolute right-0 top-14 z-50
            w-52 overflow-hidden rounded-2xl
            border border-white/10
            bg-[#161D29]/95
            backdrop-blur-xl
            opacity-0 shadow-2xl shadow-black/30
            transition-all duration-300
            group-hover:visible
            group-hover:translate-y-0
            group-hover:opacity-100
            translate-y-2
        "
      >

        {/* User Info */}
        <div className="border-b border-white/10 px-4 py-4">
          <p className="text-sm text-[#838894]">
            Signed in as
          </p>

          <p className="truncate font-semibold text-white">
            {user?.firstName} {user?.lastName}
          </p>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col p-2">

          <Link
            to={"/profile/my-profile"}
            className="
                    flex items-center gap-3 rounded-xl
                    px-3 py-2.5 text-sm font-medium text-[#E2E8F0]
                    transition-all duration-200
                    hover:bg-white/10 hover:text-white
                "
          >
            <MdDashboard className="text-lg" />
            Dashboard
          </Link>

          <button
            onClick={logOutHandler}
            className="
                    flex items-center gap-3 rounded-xl
                    px-3 py-2.5 text-sm font-medium text-[#FF8FA3]
                    transition-all duration-200
                    hover:bg-[#EF476F]/10
                "
          >
            <IoLogOutSharp className="text-lg" />
            Logout
          </button>

        </div>
      </div>
    </div>
  )
};

export default ProfileDropDown;
