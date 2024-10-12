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
    <div className={`relative text-white flex flex-col ${logoutModal && "blur-sm"}`}>

      <div className="flex flex-col gap-2 m-4">
        <div className="flex gap-2 text-sm font-[400] text-[#838894] ">
          <NavLink to={"/"} >
            <p>Home /</p>
          </NavLink>
          <NavLink>
            <p>Profile</p>
          </NavLink>
        </div>
        <div>
          <p className="text-3xl font-[500] text-[#F1F2FF] ">My Profile</p>
        </div>
      </div>

      <div className="relative lg:w-[70%] w-[85%] mx-auto sm:my-10 my-5 flex flex-col gap-5 z-0">

        <div className="flex sm:items-center justify-between gap-4 bg-[#161D29] px-5 py-6 rounded-md ">
          <div className="flex gap-4 items-center sm:flex-nowrap flex-wrap p-2 ">
            <div className="bg-[black] rounded-full">
              <img className="w-[4rem] h-[4rem] object-cover object-top rounded-full " src={user?.image} alt="profile picture" />
            </div>
            <div className="flex flex-col">
              <div className="flex gap-1 text-base font-[600] text-[#F1F2FF] ">
                <p> {user.firstName} </p>
                <p> {user.lastName} </p>
              </div>
              <p className="text-sm font-[400] text-[#838894]"> {user.email} </p>
            </div>
          </div>
          <div className="p-2">
            <Btn color={"#FFD60A"} linkTo={"/profile/setting"} textColor={"#000814"}>
              <div className="flex items-center gap-1">
                <FiEdit />
                <p>Edit</p>
              </div>
            </Btn>
          </div>
        </div>

        {user?.additionalDetails?.about &&
          <div className="flex flex-col gap-4 bg-[#161D29] px-5 py-6 rounded-md ">
            <p className="text-base font-[600] text-[#F1F2FF] ">About</p>
            <p> {user.additionalDetails.about} </p>
          </div>
        }

        <div className="w-[100%] flex flex-col gap-4 bg-[#161D29] px-5 py-6 rounded-md ">
          <div className="flex justify-between items-center p-2">
            <p className="text-base font-[600] text-[#F1F2FF] ">Personal Details</p>
          </div>
          <div className="flex md:flex-col flex-row">
            <PersonalDetailsCard
              tag_1={"First Name"} info_1={user.firstName}
              tag_2={"Last Name"} info_2={user.lastName}
              tag_3={"Email"} info_3={user.email}
            />
            <PersonalDetailsCard
              tag_1={"Phone Number"} info_1={phoneNumber ? phoneNumber : "not added"}
              tag_2={"Date of Birth"} info_2={dob ? dob : "not added"}
              tag_3={"Gender"} info_3={gender ? gender : "not added"}
            />
          </div>
        </div>

      </div>

    </div >
  )
};

export default Profile;
