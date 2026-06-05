import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Btn from "../../common/Btn";
import PhoneNumberInput from '../../common/PhoneNumberInput';
import { RiDeleteBin6Line } from "react-icons/ri";
import { setDeleteAccountModal, setDpModal, setRemoveDpModal, setUpdatePasswordInformation, setUpdatePasswordModal } from '../../../slices/profileSlice';
import { useUpdateProfileInformationHook } from '../../../services/operations/operations';
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
    <div className={`min-h-screen bg-[#000814] text-white
  ${(logoutModal || dpModal || removeDpModal || deleteAccountModal) && "blur-sm"}`}>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10">

        {/* HEADER */}
        <div className="flex flex-col gap-3">
          <Link
            to="/profile/my-profile"
            className="flex w-fit items-center gap-1.5 text-xs text-slate-600
          transition-all duration-200 hover:text-slate-400 hover:-translate-x-1"
          >
            <IoChevronBackSharp />
            Back to Profile
          </Link>

          <div className="flex w-fit items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-4 py-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <p className="text-xs font-medium text-indigo-300">Edit Account</p>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57] bg-clip-text text-transparent tracking-tight">
            Edit Profile
          </h1>
          <p className="text-sm text-slate-500">
            Manage your personal information and security settings
          </p>
        </div>

        <div className="flex flex-col gap-5">

          {/* ── PROFILE PICTURE ── */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
            <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6">

              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="overflow-hidden rounded-full border-2 border-indigo-500/30 ring-4 ring-indigo-500/10">
                  <img
                    src={user?.image}
                    alt="Profile"
                    className="h-24 w-24 object-cover object-top"
                  />
                </div>
                <div className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-[#0d1526] bg-[#a6ff5e]" />
              </div>

              {/* Text + Actions */}
              <div className="flex flex-col gap-1.5">
                <h2 className="text-lg font-bold text-white">Change Profile Picture</h2>
                <p className="text-sm text-slate-500">Upload a new profile image or remove the current one</p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => dispatch(setDpModal(true))}
                    className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]
                  px-5 py-2.5 text-sm font-bold text-black shadow-lg transition-all duration-300
                  hover:opacity-90 hover:scale-[1.02] active:scale-[0.99]"
                  >
                    Upload New
                  </button>
                  <button
                    onClick={() => dispatch(setRemoveDpModal(true))}
                    className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#111c35]
                  px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all duration-200
                  hover:bg-[#152040] hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── PROFILE INFORMATION ── */}
          <form
            onSubmit={updateInformation}
            className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
          >
            <div className="h-[2px] w-full bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]" />

            <div className="p-6 sm:p-8">

              {/* Section header */}
              <div className="mb-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1 rounded-full bg-gradient-to-b from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]" />
                  <div>
                    <h2 className="text-lg font-bold text-white">Profile Information</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Update your account details</p>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-fit rounded-2xl bg-gradient-to-r from-[#ecec07] via-[#a6ff5e] to-[#ffbc57]
                px-5 py-2.5 text-sm font-bold text-black shadow-lg transition-all duration-300
                hover:opacity-90 hover:scale-[1.02] active:scale-[0.99]"
                >
                  Save Changes
                </button>
              </div>

              {/* Fields */}
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-300">First Name</label>
                  <input
                    type="text"
                    placeholder={user?.firstName}
                    name="firstName"
                    value={formData?.firstName}
                    onChange={formDataHandler}
                    className="w-full rounded-2xl border border-white/10 bg-[#111c35] px-4 py-3 text-white
                  outline-none transition-all duration-200 placeholder:text-slate-600
                  focus:border-indigo-500/60 focus:bg-[#152040] focus:ring-1 focus:ring-indigo-500/30"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-300">Last Name</label>
                  <input
                    type="text"
                    placeholder={user?.lastName}
                    name="lastName"
                    value={formData?.lastName}
                    onChange={formDataHandler}
                    className="w-full rounded-2xl border border-white/10 bg-[#111c35] px-4 py-3 text-white
                  outline-none transition-all duration-200 placeholder:text-slate-600
                  focus:border-indigo-500/60 focus:bg-[#152040] focus:ring-1 focus:ring-indigo-500/30"
                  />
                </div>

                <div className="flex flex-col gap-2 lg:col-span-2">
                  <label className="text-sm font-medium text-slate-300">Phone Number</label>
                  <div className="rounded-2xl border border-white/10 bg-[#111c35] 
                transition-all duration-200 focus-within:border-indigo-500/60 focus-within:bg-[#152040]
                focus-within:ring-1 focus-within:ring-indigo-500/30">
                    <PhoneNumberInput
                      placeholder={user?.additionalDetails?.contactNumber}
                      name="contactNumber"
                      value={formData?.contactNumber}
                      onChange={formDataHandler}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 lg:col-span-2">
                  <label className="text-sm font-medium text-slate-300">About</label>
                  <textarea
                    rows={4}
                    maxLength={150}
                    placeholder={user?.additionalDetails?.about}
                    name="about"
                    value={formData?.contact}
                    onChange={formDataHandler}
                    className="w-full rounded-2xl border border-white/10 bg-[#111c35] p-4 text-white
                  outline-none transition-all duration-200 placeholder:text-slate-600 resize-none
                  focus:border-indigo-500/60 focus:bg-[#152040] focus:ring-1 focus:ring-indigo-500/30"
                  />
                </div>
              </div>
            </div>
          </form>

          {/* ── CHANGE PASSWORD ── */}
          <form
            onSubmit={updateOnClickHandler}
            className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
          >
            <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

            <div className="p-6 sm:p-8">

              {/* Section header */}
              <div className="mb-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1 rounded-full bg-gradient-to-b from-indigo-400 to-purple-500" />
                  <div>
                    <h2 className="text-lg font-bold text-white">Change Password</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Update your account password securely</p>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-fit rounded-2xl border border-white/10 bg-[#111c35] px-5 py-2.5
                text-sm font-semibold text-slate-300 transition-all duration-200
                hover:bg-[#152040] hover:text-white"
                >
                  Update Password
                </button>
              </div>

              {/* Password fields */}
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                {[
                  { label: "Current Password", value: updatePasswordData?.oldPassword, name: "oldPassword", visible: seeCurrentPassword, toggle: () => setSeeCurrentPassword(p => !p) },
                  { label: "New Password", value: updatePasswordData?.newPassword, name: "newPassword", visible: seeNewPassword, toggle: () => setSeeNewPassword(p => !p) },
                  { label: "Confirm Password", value: updatePasswordData?.confirmNewPassword, name: "confirmNewPassword", visible: seeConfirmNewPassword, toggle: () => setSeeConfirmNewPassword(p => !p) },
                ].map((field, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-300">{field.label}</label>
                    <div className="relative">
                      <input
                        type={field.visible ? "text" : "password"}
                        required
                        name={field.name}
                        value={field.value}
                        onChange={updatePasswordDataHandler}
                        className="w-full rounded-2xl border border-white/10 bg-[#111c35] px-4 py-3 pr-12
                      text-white outline-none transition-all duration-200
                      focus:border-indigo-500/60 focus:bg-[#152040] focus:ring-1 focus:ring-indigo-500/30"
                      />
                      <button
                        type="button"
                        onClick={field.toggle}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500
                      hover:text-slate-200 transition-colors duration-200"
                      >
                        {field.visible ? <IoEyeOutline className="text-xl" /> : <IoEyeOffOutline className="text-xl" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>

          {/* ── DELETE ACCOUNT ── */}
          <div className="overflow-hidden rounded-3xl border border-red-500/20 bg-[#0d1526] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
            <div className="h-[2px] w-full bg-gradient-to-r from-red-500 via-red-400 to-red-500" />

            <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-5">

              {/* Icon */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl
            border border-red-500/20 bg-red-500/10">
                <RiDeleteBin6Line className="text-2xl text-red-400" />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3">
                <h2 className="text-lg font-bold text-white">Delete Account</h2>
                <p className="text-sm leading-relaxed text-slate-400 max-w-2xl">
                  Deleting your account will permanently remove all your data,
                  purchased courses, and profile information. This action cannot be undone.
                </p>
                <button
                  onClick={() => dispatch(setDeleteAccountModal(true))}
                  className="mt-1 w-fit rounded-2xl border border-red-500/20 bg-red-500/10
                px-5 py-2.5 text-sm font-semibold text-red-400 transition-all duration-200
                hover:bg-red-500/20 hover:text-red-300"
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
