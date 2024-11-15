import React from "react"
import { sidebarLinks } from "../../data/dashboard-links";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogoutModal } from "../../slices/profileSlice";
import { IoSettings } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";

const Sidebar = (props) => {

  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.profile)
  const accountType = user?.accountType

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-start my-2">
        {
          accountType === "Instructor" &&
          <p className="text-sm font-[600] text-[#C5C7D4] mx-5 my-2 ">Instructor</p>
        }
        {
          sidebarLinks.map((item, index) => (
            item.type.includes(accountType) &&
            <NavLink key={index} to={item.path} className="nav-links flex items-center pl-3 py-2 gap-2" >
              <p className="text-lg">{item.icon}</p>
              <p> {item.name} </p>
            </NavLink>
          ))
        }
      </div>
      <div className="w-[90%] h-[1px] mx-auto bg-[#424854] " ></div>
      <div className="flex flex-col justify-start my-5">
        <NavLink to={"/profile/setting"} className="nav-links flex items-center pl-3 py-2 gap-2" >
          <IoSettings className="text-lg" />
          <p>Setting</p>
        </NavLink>
        <button onClick={() => dispatch(setLogoutModal(true))} className="nav-links flex items-center pl-3 py-2 gap-2">
          <MdOutlineLogout className="text-lg" />
          <p>Logout</p>
        </button>
      </div>
    </div>
  )
};

export default Sidebar;
