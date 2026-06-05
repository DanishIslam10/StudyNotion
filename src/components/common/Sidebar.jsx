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
    <div className="z-50 flex h-full w-full flex-col bg-[#0d1526] border-r border-white/10 text-white">

      {/* TOP ACCENT */}
      <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

      {/* MOBILE CLOSE */}
      <div className="flex w-full justify-between items-center p-4 md:hidden border-b border-white/[0.06]">
        <div className="flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-3 py-1">
          <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
          <p className="text-xs font-medium text-indigo-300">Menu</p>
        </div>

        {showSideBar && (
          <button
            onClick={closeSideBarHandler}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-[#111c35]
          transition-all duration-200 hover:bg-[#152040] hover:border-indigo-500/30"
          >
            <CiSquareRemove className="text-xl text-slate-400" />
          </button>
        )}
      </div>

      {/* MAIN NAV */}
      <div className="flex flex-col gap-1 px-3 py-4">

        {/* Instructor label */}
        {accountType === "Instructor" && (
          <div className="px-3 pb-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
              Instructor Panel
            </p>
          </div>
        )}

        {sidebarLinks.map((item, index) => (
          item.type.includes(accountType) && (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200
            ${isActive
                  ? "bg-gradient-to-r from-[#ecec07]/10 via-[#a6ff5e]/10 to-[#ffbc57]/10 border border-[#a6ff5e]/20 text-[#a6ff5e]"
                  : "text-slate-500 hover:bg-[#111c35] hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-all duration-200
                ${isActive
                      ? "border-[#a6ff5e]/20 bg-[#a6ff5e]/10"
                      : "border-white/10 bg-[#111c35] group-hover:border-indigo-500/20"
                    }`}>
                    <span className={`text-base ${isActive ? "text-[#a6ff5e]" : "text-slate-500 group-hover:text-indigo-400"}`}>
                      {item.icon}
                    </span>
                  </div>
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          )
        ))}
      </div>

      {/* DIVIDER */}
      {token && <div className="mx-4 border-t border-white/[0.06]" />}

      {/* MOBILE NAV LINKS */}
      <div className="flex flex-col gap-1 px-3 py-4 md:hidden">

        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
          Navigate
        </p>

        {NavbarLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200
          ${isActive
                ? "bg-[#111c35] border border-white/10 text-white"
                : "text-slate-500 hover:bg-[#111c35] hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-all duration-200
              ${isActive
                    ? "border-white/10 bg-[#152040]"
                    : "border-white/10 bg-[#111c35] group-hover:border-indigo-500/20"
                  }`}>
                  <span className={`text-base ${isActive ? "text-white" : "text-slate-500 group-hover:text-indigo-400"}`}>
                    {link.icon}
                  </span>
                </div>
                <span>{link.title}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* BOTTOM SECTION */}
      {token && (
        <div className="mt-auto flex flex-col gap-1 px-3 pb-6">

          <div className="border-t border-white/[0.06] mb-3" />

          {/* Settings */}
          <NavLink
            to="/profile/setting"
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200
          ${isActive
                ? "bg-[#111c35] border border-white/10 text-white"
                : "text-slate-500 hover:bg-[#111c35] hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-all duration-200
              ${isActive
                    ? "border-white/10 bg-[#152040]"
                    : "border-white/10 bg-[#111c35] group-hover:border-indigo-500/20"
                  }`}>
                  <IoSettings className={`text-base ${isActive ? "text-white" : "text-slate-500 group-hover:text-indigo-400"}`} />
                </div>
                <span>Settings</span>
              </>
            )}
          </NavLink>

          {/* Logout */}
          <button
            onClick={() => dispatch(setLogoutModal(true))}
            className="group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium
          text-slate-500 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#111c35]
          transition-all duration-200 group-hover:border-red-500/20 group-hover:bg-red-500/10">
              <MdOutlineLogout className="text-base text-slate-500 group-hover:text-red-400 transition-colors duration-200" />
            </div>
            <span>Logout</span>
          </button>

        </div>
      )}
    </div>
  )
};

export default Sidebar;
