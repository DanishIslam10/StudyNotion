import React from "react"
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Btn from "../../common/Btn";
import { FiEdit } from "react-icons/fi";
import PersonalDetailsCard from "./PersonalDetailsCard";

const Profile = (props) => {

  const { user } = useSelector((state) => state.profile)
  const { logoutModal } = useSelector((state) => state.profile)

  const phoneNumber = user?.additionalDetails?.contactNumber
  const dob = user?.additionalDetails?.dateOfBirth
  const gender = user?.additionalDetails?.gender

  return (
    <div className={`relative min-h-screen bg-[#000814] text-white ${logoutModal && "blur-sm"}`}>
      <div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-10">

        {/* BREADCRUMB + HEADING */}
        <div className="mb-8 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <NavLink to="/" className="transition-colors duration-200 hover:text-slate-400">Home</NavLink>
            <span>/</span>
            <p className="text-slate-500">Profile</p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-4 py-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <p className="text-xs font-medium text-indigo-300">My Account</p>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent tracking-tight">
            My Profile
          </h1>
          <p className="text-sm text-slate-500">
            Manage your personal information and account settings
          </p>
        </div>

        <div className="flex flex-col gap-5">

          {/* PROFILE CARD */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
            <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

              {/* AVATAR + INFO */}
              <div className="flex flex-wrap items-center gap-5">

                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="overflow-hidden rounded-full border-2 border-indigo-500/30 ring-4 ring-indigo-500/10">
                    <img
                      src={user?.image}
                      alt="Profile"
                      className="h-20 w-20 object-cover object-top"
                    />
                  </div>
                  <div className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-[#0d1526] bg-[#a6ff5e]" />
                </div>

                {/* Name + email + badge */}
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-sm text-slate-500">{user.email}</p>
                  <div className="flex w-fit items-center gap-1.5 rounded-full border border-[#a6ff5e]/20 bg-[#a6ff5e]/10 px-3 py-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#a6ff5e]" />
                    <p className="text-xs font-semibold text-[#a6ff5e]">{user?.accountType}</p>
                  </div>
                </div>
              </div>

              {/* EDIT BUTTON */}
              <NavLink to="/profile/setting" className="shrink-0">
                <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]
              px-5 py-2.5 text-sm font-bold text-black shadow-lg transition-all duration-300
              hover:opacity-90 hover:scale-[1.02] active:scale-[0.99]">
                  <FiEdit className="text-base" />
                  Edit Profile
                </button>
              </NavLink>
            </div>
          </div>

          {/* ABOUT */}
          {user?.additionalDetails?.about && (
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
              <div className="h-[2px] w-full bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]" />

              <div className="p-6 sm:p-8 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1 rounded-full bg-gradient-to-b from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]" />
                  <h3 className="text-lg font-bold text-white">About</h3>
                </div>
                <p className="text-sm sm:text-base leading-7 text-slate-400">
                  {user.additionalDetails.about}
                </p>
              </div>
            </div>
          )}

          {/* PERSONAL DETAILS */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
            <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

            <div className="p-6 sm:p-8">

              {/* Section heading */}
              <div className="mb-6 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-gradient-to-b from-indigo-400 to-purple-500" />
                <div>
                  <h3 className="text-lg font-bold text-white">Personal Details</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Your account information and personal data</p>
                </div>
              </div>

              {/* Detail cards */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

                <div className="rounded-2xl border border-white/[0.07] bg-[#111c35] p-5
              hover:border-indigo-500/20 transition-all duration-200">
                  <PersonalDetailsCard
                    tag_1="First Name" info_1={user.firstName}
                    tag_2="Last Name" info_2={user.lastName}
                    tag_3="Email" info_3={user.email}
                  />
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-[#111c35] p-5
              hover:border-indigo-500/20 transition-all duration-200">
                  <PersonalDetailsCard
                    tag_1="Phone Number" info_1={phoneNumber || "Not Added"}
                    tag_2="Date of Birth" info_2={dob || "Not Added"}
                    tag_3="Gender" info_3={gender || "Not Added"}
                  />
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
};

export default Profile;
