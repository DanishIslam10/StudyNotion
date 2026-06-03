import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Btn from "../../common/Btn";
import PhoneNumberInput from '../../common/PhoneNumberInput';
import { RiDeleteBin6Line } from "react-icons/ri";
import { setDeleteAccountModal, setDpModal, setRemoveDpModal, setUpdatePasswordInformation, setUpdatePasswordModal } from '../../../slices/profileSlice';
import { useUpdatePasswordHook, useUpdateProfileInformationHook } from '../../../services/operations/operations';
import toast from 'react-hot-toast';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

const Setting = (props) => {

  const { user } = useSelector((state) => state.profile)
  const { logoutModal, dpModal, removeDpModal, deleteAccountModal } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const updateProfileInformation = useUpdateProfileInformationHook()
  const { updatePasswordInformation } = useSelector((state) => state.profile)
  const [seeCurrentPassword, setSeeCurrentPassword] = useState(false)
  const [seeNewPassword, setSeeNewPassword] = useState(false)
  const [seeConfirmNewPassword, setSeeConfirmNewPassword] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    about: "",
  })

  const [updatePasswordData, setUpdatePasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  })

  function formDataHandler(event) {
    const { name, value } = event.target
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  function updatePasswordDataHandler(event) {
    const { name, value } = event.target
    setUpdatePasswordData((prevData) => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }

  function updateInformation(event) {
    event.preventDefault()
    // console.log("Information Form Data: ", formData)
    updateProfileInformation(formData)
  }

  function updateOnClickHandler(e) {
    e.preventDefault()
    if (updatePasswordData.newPassword !== updatePasswordData.confirmNewPassword) {
      toast.error("Password do not match")
      return
    }
    dispatch(setUpdatePasswordInformation(updatePasswordData))
    dispatch(setUpdatePasswordModal(true))
    setUpdatePasswordData({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    })
  }

  return (
    <div
      className={`
    min-h-screen bg-[#0B1120] text-white
    ${(logoutModal || dpModal || removeDpModal || deleteAccountModal) && "blur-sm"}
  `}
    >

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8">

        {/* Header */}
        <div className="flex flex-col gap-3">

          <Link
            to={"/profile/my-profile"}
            className="
          flex w-fit items-center gap-2
          text-sm text-[#94A3B8]
          transition-all duration-300
          hover:text-white hover:-translate-x-1
        "
          >
            <IoChevronBackSharp />
            Back to Profile
          </Link>

          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Edit Profile
            </h1>

            <p className="mt-2 text-sm text-[#838894]">
              Manage your personal information and security settings
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-6">

          {/* Profile Picture Card */}
          <div
            className="
          rounded-3xl border border-white/10
          bg-[#161D29]/80
          p-6 backdrop-blur-xl
          shadow-2xl shadow-black/20
        "
          >

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              {/* Left */}
              <div className="flex flex-wrap items-center gap-5">

                {/* Avatar */}
                <div className="relative">
                  <div className="overflow-hidden rounded-full border-2 border-yellow-300/20">
                    <img
                      className="h-24 w-24 object-cover object-top"
                      src={user?.image}
                      alt="profile picture"
                    />
                  </div>

                  <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-[#161D29] bg-green-400"></div>
                </div>

                {/* Text */}
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Change Profile Picture
                  </h2>

                  <p className="mt-1 text-sm text-[#94A3B8]">
                    Upload a new profile image
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">

                    <Btn
                      children={"Upload New"}
                      color={"#FFD60A"}
                      textColor={"#000814"}
                      onClickFunction={() => dispatch(setDpModal(true))}
                    />

                    <Btn
                      children={"Remove"}
                      variant="secondary"
                      onClickFunction={() => dispatch(setRemoveDpModal(true))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <form
            onSubmit={updateInformation}
            className="
          rounded-3xl border border-white/10
          bg-[#161D29]/80
          p-6 backdrop-blur-xl
          shadow-2xl shadow-black/20
        "
          >

            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Profile Information
                </h2>

                <p className="mt-1 text-sm text-[#838894]">
                  Update your account details
                </p>
              </div>

              <Btn
                children={"Save Changes"}
                color={"#FFD60A"}
                textColor={"#000814"}
                type='submit'
              />
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

              {/* First Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#CBD5E1]">
                  First Name
                </label>

                <input
                  className="
                rounded-2xl border border-white/10
                bg-[#0F172A]
                px-4 py-3
                text-white outline-none
                transition-all duration-300
                placeholder:text-[#6B7280]
                focus:border-yellow-400
              "
                  type="text"
                  placeholder={user?.firstName}
                  name='firstName'
                  value={formData?.firstName}
                  onChange={formDataHandler}
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#CBD5E1]">
                  Last Name
                </label>

                <input
                  className="
                rounded-2xl border border-white/10
                bg-[#0F172A]
                px-4 py-3
                text-white outline-none
                transition-all duration-300
                placeholder:text-[#6B7280]
                focus:border-yellow-400
              "
                  type="text"
                  placeholder={user?.lastName}
                  name='lastName'
                  value={formData?.lastName}
                  onChange={formDataHandler}
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2 text-[#CBD5E1] lg:col-span-2">
                <label className="text-sm font-medium text-[#CBD5E1]">
                  Phone Number
                </label>

                <PhoneNumberInput
                  placeholder={user?.additionalDetails?.contactNumber}
                  name={"contactNumber"}
                  value={formData?.contactNumber}
                  onChange={formDataHandler}
                />
              </div>

              {/* About */}
              <div className="flex flex-col gap-2 lg:col-span-2">
                <label className="text-sm font-medium text-[#CBD5E1]">
                  About
                </label>

                <textarea
                  rows={5}
                  maxLength={150}
                  placeholder={user?.additionalDetails?.about}
                  name='about'
                  value={formData?.contact}
                  onChange={formDataHandler}
                  className="
                rounded-2xl border border-white/10
                bg-[#0F172A]
                p-4 text-white outline-none
                transition-all duration-300
                placeholder:text-[#6B7280]
                focus:border-yellow-400
              "
                />
              </div>

            </div>
          </form>

          {/* Change Password */}
          <form
            onSubmit={updateOnClickHandler}
            className="
          rounded-3xl border border-white/10
          bg-[#161D29]/80
          p-6 backdrop-blur-xl
          shadow-2xl shadow-black/20
        "
          >

            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Change Password
                </h2>

                <p className="mt-1 text-sm text-[#838894]">
                  Update your account password securely
                </p>
              </div>

              <Btn
                children={"Update Password"}
                color={"#FFD60A"}
                textColor={"#000814"}
                type='submit'
              />
            </div>

            {/* Password Inputs */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

              {/* Password Field Template */}
              {
                [
                  {
                    label: "Current Password",
                    value: updatePasswordData?.oldPassword,
                    name: "oldPassword",
                    visible: seeCurrentPassword,
                    toggle: () => setSeeCurrentPassword((prev) => !prev),
                  },
                  {
                    label: "New Password",
                    value: updatePasswordData?.newPassword,
                    name: "newPassword",
                    visible: seeNewPassword,
                    toggle: () => setSeeNewPassword((prev) => !prev),
                  },
                  {
                    label: "Confirm Password",
                    value: updatePasswordData?.confirmNewPassword,
                    name: "confirmNewPassword",
                    visible: seeConfirmNewPassword,
                    toggle: () => setSeeConfirmNewPassword((prev) => !prev),
                  },
                ].map((field, index) => (
                  <div key={index} className="flex flex-col gap-2">

                    <label className="text-sm font-medium text-[#CBD5E1]">
                      {field.label}
                    </label>

                    <div className="relative">

                      <input
                        className="
                      w-full rounded-2xl border border-white/10
                      bg-[#0F172A]
                      px-4 py-3 pr-12
                      text-white outline-none
                      transition-all duration-300
                      focus:border-yellow-400
                    "
                        type={field.visible ? "text" : "password"}
                        required
                        name={field.name}
                        value={field.value}
                        onChange={updatePasswordDataHandler}
                      />

                      <button
                        type="button"
                        onClick={field.toggle}
                        className="
                      absolute right-4 top-1/2
                      -translate-y-1/2
                      text-xl text-[#94A3B8]
                      hover:text-white
                    "
                      >
                        {
                          field.visible
                            ? <IoEyeOutline />
                            : <IoEyeOffOutline />
                        }
                      </button>

                    </div>
                  </div>
                ))
              }
            </div>
          </form>

          {/* Delete Account */}
          <div
            className="
          rounded-3xl border border-[#EF476F]/20
          bg-[#2A0D16]/70
          p-6 backdrop-blur-xl
          shadow-2xl shadow-black/20
        "
          >

            <div className="flex flex-col gap-5 sm:flex-row">

              {/* Icon */}
              <div
                className="
              flex h-16 w-16 items-center justify-center
              rounded-2xl bg-[#EF476F]/10
              text-3xl text-[#FF7B94]
            "
              >
                <RiDeleteBin6Line />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-3">

                <h2 className="text-2xl font-bold text-white">
                  Delete Account
                </h2>

                <p className="max-w-2xl leading-7 text-[#FBC7D1]">
                  Deleting your account will permanently remove all your data,
                  purchased courses, and profile information.
                </p>

                <button
                  onClick={() => dispatch(setDeleteAccountModal(true))}
                  className="
                mt-2 w-fit rounded-xl
                border border-[#EF476F]/20
                bg-[#EF476F]/10
                px-5 py-3
                font-medium text-[#FF8FA3]
                transition-all duration-300
                hover:bg-[#EF476F]/20
              "
                >
                  Delete My Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Setting;
