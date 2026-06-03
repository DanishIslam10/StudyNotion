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
    <div
      className="
    z-50 flex h-full w-full flex-col
    border-r border-white/10
    bg-[#111827]/90
    backdrop-blur-2xl
    text-white
  "
    >

      {/* Mobile Close Button */}
      <div className="flex w-full justify-end p-3 md:hidden">
        {
          showSideBar && (
            <button
              onClick={closeSideBarHandler}
              className="
            rounded-xl border border-white/10
            bg-white/5 p-2
            transition-all duration-300
            hover:bg-white/10
          "
            >
              <CiSquareRemove className="text-2xl text-[#CBD5E1]" />
            </button>
          )
        }
      </div>

      {/* Main Navigation */}
      <div className="flex flex-col gap-2 px-3 py-2">

        {/* Instructor Label */}
        {
          accountType === "Instructor" && (
            <div className="px-3 pb-2 pt-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#838894]">
                Instructor Panel
              </p>
            </div>
          )
        }

        {/* Sidebar Links */}
        {
          sidebarLinks.map((item, index) => (
            item.type.includes(accountType) && (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `
                group flex items-center gap-3
                rounded-xl px-4 py-3
                text-sm font-medium
                transition-all duration-300

                ${isActive
                    ? "bg-gradient-to-r from-yellow-300/20 to-orange-400/10 text-yellow-300 border border-yellow-400/20"
                    : "text-[#AAB0C0] hover:bg-white/5 hover:text-white"
                  }
              `
                }
              >
                <span className="text-lg">
                  {item.icon}
                </span>

                <span>
                  {item.name}
                </span>
              </NavLink>
            )
          ))
        }
      </div>

      {/* Divider */}
      {
        token && (
          <div className="mx-4 my-4 h-[1px] bg-white/10"></div>
        )
      }

      {/* Mobile Navigation */}
      <div className="flex flex-col gap-2 px-3">

        <div className="md:hidden flex flex-col gap-1">

          {
            NavbarLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  `
                flex items-center gap-3
                rounded-xl px-4 py-3
                text-sm font-medium
                transition-all duration-300

                ${isActive
                    ? "bg-white/10 text-white"
                    : "text-[#AAB0C0] hover:bg-white/5 hover:text-white"
                  }
              `
                }
              >
                <span className="text-lg">
                  {link.icon}
                </span>

                <span>
                  {link.title}
                </span>
              </NavLink>
            ))
          }
        </div>

        {/* Divider */}
        {
          token && (
            <div className="md:hidden mx-1 my-4 h-[1px] bg-white/10"></div>
          )
        }

        {/* Settings */}
        {
          token && (
            <NavLink
              to={"/profile/setting"}
              className={({ isActive }) =>
                `
              flex items-center gap-3
              rounded-xl px-4 py-3
              text-sm font-medium
              transition-all duration-300

              ${isActive
                  ? "bg-white/10 text-white"
                  : "text-[#AAB0C0] hover:bg-white/5 hover:text-white"
                }
            `
              }
            >
              <IoSettings className="text-lg" />
              <span>Settings</span>
            </NavLink>
          )
        }

        {/* Logout */}
        {
          token && (
            <button
              onClick={() => dispatch(setLogoutModal(true))}
              className="
            flex items-center gap-3
            rounded-xl px-4 py-3
            text-sm font-medium text-[#FF8FA3]
            transition-all duration-300
            hover:bg-[#EF476F]/10
          "
            >
              <MdOutlineLogout className="text-lg" />
              <span>Logout</span>
            </button>
          )
        }
      </div>
    </div>
  )
};

export default Sidebar;
