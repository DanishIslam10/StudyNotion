import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Btn from "../../common/Btn";
import { FiEdit } from "react-icons/fi";
import { setDpModal, setLogoutModal } from "../../../slices/profileSlice";
import PersonalDetailsCard from "./PersonalDetailsCard";

const Profile = (props) => {

  const { user } = useSelector((state) => state.profile)
  const { logoutModal } = useSelector((state) => state.profile)

  const phoneNumber = user?.additionalDetails?.contactNumber
  const dob = user?.additionalDetails?.dateOfBirth
  const gender = user?.additionalDetails?.gender

  return (
    <div className={`relative min-h-screen bg-[#0B1120] text-white ${logoutModal && "blur-sm"}`}>

      {/* Page Container */}
      <div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-8">

        {/* Breadcrumb */}
        <div className="mb-8 flex flex-col gap-3">

          <div className="flex items-center gap-2 text-sm text-[#838894]">

            <NavLink
              to={"/"}
              className="transition-colors hover:text-white"
            >
              Home
            </NavLink>

            <span>/</span>

            <p className="text-[#CBD5E1]">
              Profile
            </p>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              My Profile
            </h1>

            <p className="mt-2 text-sm text-[#838894]">
              Manage your personal information and account settings
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6">

          {/* Profile Card */}
          <div
            className="
            rounded-3xl border border-white/10
            bg-[#161D29]/80
            p-6 backdrop-blur-xl
            shadow-2xl shadow-black/20
          "
          >

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              {/* User Info */}
              <div className="flex flex-wrap items-center gap-5">

                {/* Avatar */}
                <div className="relative">
                  <div className="overflow-hidden rounded-full border-2 border-yellow-300/20">
                    <img
                      className="h-20 w-20 object-cover object-top"
                      src={user?.image}
                      alt="profile picture"
                    />
                  </div>

                  {/* Online Indicator */}
                  <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-[#161D29] bg-green-400"></div>
                </div>

                {/* Name & Email */}
                <div>

                  <h2 className="text-2xl font-bold text-white">
                    {user.firstName} {user.lastName}
                  </h2>

                  <p className="mt-1 text-sm text-[#94A3B8]">
                    {user.email}
                  </p>

                  <div className="mt-3 flex w-fit items-center gap-2 rounded-full border border-yellow-400/10 bg-yellow-400/10 px-3 py-1 text-xs font-medium text-yellow-300">
                    {user?.accountType}
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <div>
                <Btn
                  color={"#FFD60A"}
                  linkTo={"/profile/setting"}
                  textColor={"#000814"}
                >
                  <div className="flex items-center gap-2">
                    <FiEdit />
                    <p>Edit Profile</p>
                  </div>
                </Btn>
              </div>
            </div>
          </div>

          {/* About Section */}
          {
            user?.additionalDetails?.about && (
              <div
                className="
                rounded-3xl border border-white/10
                bg-[#161D29]/80
                p-6 backdrop-blur-xl
                shadow-xl shadow-black/10
              "
              >

                <div className="flex flex-col gap-4">

                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">
                      About
                    </h3>

                    <div className="h-[1px] flex-1 bg-white/10 ml-4"></div>
                  </div>

                  <p className="leading-7 text-[#CBD5E1]">
                    {user.additionalDetails.about}
                  </p>
                </div>
              </div>
            )
          }

          {/* Personal Details */}
          <div
            className="
            rounded-3xl border border-white/10
            bg-[#161D29]/80
            p-6 backdrop-blur-xl
            shadow-xl shadow-black/10
          "
          >

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">

              <div>
                <h3 className="text-xl font-semibold text-white">
                  Personal Details
                </h3>

                <p className="mt-1 text-sm text-[#838894]">
                  Your account information and personal data
                </p>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

              <div
                className="
                rounded-2xl border border-white/5
                bg-[#0F172A]/60
                p-5
              "
              >
                <PersonalDetailsCard
                  tag_1={"First Name"}
                  info_1={user.firstName}

                  tag_2={"Last Name"}
                  info_2={user.lastName}

                  tag_3={"Email"}
                  info_3={user.email}
                />
              </div>

              <div
                className="
                rounded-2xl border border-white/5
                bg-[#0F172A]/60
                p-5
              "
              >
                <PersonalDetailsCard
                  tag_1={"Phone Number"}
                  info_1={phoneNumber ? phoneNumber : "Not Added"}

                  tag_2={"Date of Birth"}
                  info_2={dob ? dob : "Not Added"}

                  tag_3={"Gender"}
                  info_3={gender ? gender : "Not Added"}
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Profile;
