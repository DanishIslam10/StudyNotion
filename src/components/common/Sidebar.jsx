import React from "react"
import { sidebarLinks } from "../../data/dashboard-links";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogoutModal, setShowSideBar } from "../../slices/profileSlice";
import { IoSettings } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { CiSquareRemove } from "react-icons/ci";
import { NavbarLinks } from "../../data/navbar-links";

const Sidebar = (props) => {

  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const accountType = user?.accountType
  const { showSideBar } = useSelector((state) => state.profile)

  function closeSideBarHandler() {
    dispatch(setShowSideBar(!showSideBar))
  }

  return (
    <div className={`z-50 flex flex-col`}>
      <div className="w-full flex justify-end">
        {
          showSideBar &&
          <CiSquareRemove
            className="text-3xl md:hidden m-1 "
            onClick={closeSideBarHandler}
          />
        }
      </div>
      <div className="flex flex-col justify-start my-2">
        {
          accountType === "Instructor" &&
          <p className="text-sm font-[600] text-[#C5C7D4] mx-5 my-2 ">Instructor</p>
        }
        {
          sidebarLinks.map((item, index) => (
            item.type.includes(accountType) &&
            <NavLink key={index} to={item.path} className="font-[600] text-[rgba(153,157,170,1)] flex items-center pl-3 py-2 gap-2" >
              <p className="text-lg">{item.icon}</p>
              <p> {item.name} </p>
            </NavLink>
          ))
        }
      </div>
      {
        token &&
        <div className="w-[90%] h-[1px] mx-auto bg-[#424854]"></div>
      }
      <div className="flex flex-col justify-start">
        <div className="md:hidden flex flex-col font-[600] text-[rgba(153,157,170,1)] ">
          {NavbarLinks.map((link, index) => {
            return (
              <div key={index}>
                <NavLink to={link.path} className="flex gap-2 items-center px-2 py-2">
                  <p className="text-lg">{link.icon}</p>
                  <p> {link.title} </p>
                </NavLink>
              </div>
            );
          })}
        </div>
        <div className="md:hidden w-[90%] h-[1px] mx-auto my-2 bg-[#424854]" ></div>
        <NavLink to={"/profile/setting"} className="font-[600] text-[rgba(153,157,170,1)] flex items-center pl-3 py-2 gap-2" >
          <IoSettings className="text-lg" />
          <p>Setting</p>
        </NavLink>
        <button onClick={() => dispatch(setLogoutModal(true))} className="font-[600] text-[rgba(153,157,170,1)] flex items-center pl-3 py-2 gap-2">
          <MdOutlineLogout className="text-lg" />
          <p>Logout</p>
        </button>
      </div>
    </div>
  )
};

export default Sidebar;
