import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Btn from "../../common/Btn";
import PhoneNumberInput from '../../common/PhoneNumberInput';
import { RiDeleteBin6Line } from "react-icons/ri";
import { setDeleteAccountModal, setDpModal, setRemoveDpModal } from '../../../slices/profileSlice';
import { useUpdatePasswordHook, useUpdateProfileInformationHook } from '../../../services/operations/operations';

const Setting = (props) => {

  const { user } = useSelector((state) => state.profile)
  const { logoutModal, dpModal, removeDpModal,deleteAccountModal } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const updateProfileInformation = useUpdateProfileInformationHook()
  const updatePassword = useUpdatePasswordHook()

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

  function updatePasswordHandler(event) {
    event.preventDefault()
    // console.log("update password data: ",updatePasswordData)
    updatePassword(updatePasswordData)
  }

  return (
    <div className={`flex flex-col justify-center gap-4 mb-10
     ${(logoutModal || dpModal || removeDpModal || deleteAccountModal) && "blur-sm"}
    `}>
      <div className="flex flex-col gap-2 m-4">
        <Link to={"/profile/my-profile"} className="w-min flex items-center transition-all duration-75 text-sm font-[400] text-[#838894]
         hover:text-white hover:scale-110">
          <IoChevronBackSharp />
          <p>Back</p>
        </Link>
        <div>
          <p className="text-3xl font-[500] text-[#F1F2FF] ">Edit Profile</p>
        </div>
      </div>

      <div className='lg:w-[80%] md:w-[90%] sm:w-[75%] w-[90%] mx-auto flex flex-col gap-4'>
        <div className="w-full flex sm:items-center justify-between gap-4 px-5 py-6 rounded-md bg-[#161D29] ">
          <div className="w-full flex gap-4 items-center sm:flex-nowrap flex-wrap p-2">
            <div className="bg-[black] rounded-full">
              <img className="w-[4rem] h-[4rem] object-cover object-top rounded-full " src={user?.image} alt="profile picture" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex text-base font-[600] text-[#F1F2FF] ">
                <p>Change Profile Picture</p>
              </div>
              <div className="flex gap-2">
                <Btn
                  children={"Change"}
                  color={"#FFD60A"}
                  textColor={"#000814"}
                  onClickFunction={() => dispatch(setDpModal(true))}
                >
                </Btn>
                <Btn
                  children={"Remove"}
                  color={"#2C333F"}
                  textColor={"#F1F2FF"}
                  onClickFunction={() => dispatch(setRemoveDpModal(true))}
                >
                </Btn>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={updateInformation} className="edit-profile-details-form w-full flex flex-col gap-4 bg-[#161D29] p-5 rounded-md">
          <div className='flex w-full justify-between'>
            <span className="text-lg font-[600] text-[#F1F2FF] ">Edit Profile Information</span>
            <Btn
              children={"Update"}
              color={"#FFD60A"}
              textColor={"#000814"}
              type='submit'
            />
          </div>
          {/* first name and last name */}
          <div className="flex md:flex-row flex-col gap-4">
            <div className="w-full flex flex-col">
              <p>First name</p>
              <input
                className='bg-[#2C333F] py-[0.6rem] px-[0.4rem] rounded-md '
                type="text"
                placeholder={user?.firstName}
                name='firstName'
                value={formData?.firstName}
                onChange={formDataHandler}
              />
            </div>
            <div className="w-full flex flex-col">
              <p>Last name</p>
              <input
                className='bg-[#2C333F]  py-[0.6rem] px-[0.4rem] rounded-md '
                type="text"
                placeholder={user?.lastName}
                name='lastName'
                value={formData?.lastName}
                onChange={formDataHandler}
              />
            </div>
            {/* phone number */}
            <div className='w-full flex md:flex-row flex-col gap-4'>
              <div className='w-full '>
                <p>Phone Number</p>
                <PhoneNumberInput
                  placeholder={user?.additionalDetails?.contactNumber}
                  name={"contactNumber"}
                  value={formData?.contactNumber}
                  onChange={formDataHandler}
                />
              </div>
            </div>
          </div>
          {/* about */}
          <div className='w-full'>
            <p>About</p>
            <textarea
              rows={4}
              maxLength={100}
              placeholder={user?.additionalDetails?.about}
              name='about'
              value={formData?.contact}
              onChange={formDataHandler}
              className='w-full bg-[#2C333F] rounded-md text-white p-2'>
            </textarea>
          </div>
        </form>

        {/* change password */}
        <form onSubmit={updatePasswordHandler} className='edit-profile-details-form w-full flex flex-col gap-4 text-[white] bg-[#161D29] rounded-md p-5'>
          <div className='flex w-full justify-between'>
            <span className="text-lg font-[600] text-[#F1F2FF] " >Change Password</span>
            <Btn
              children={"Update"}
              color={"#FFD60A"}
              textColor={"#000814"}
              type='submit'
            />
          </div>
          <div className='flex md:flex-row flex-col gap-4'>
            <div className='w-full flex flex-col'>
              <p>Current Password</p>
              <input
                className='bg-[#2C333F]  py-[0.6rem] px-[0.4rem] rounded-md '
                type='password'
                required={true}
                name='oldPassword'
                value={updatePasswordData?.password}
                onChange={updatePasswordDataHandler}
              />
            </div>
            <div className='w-full flex flex-col'>
              <p>New Password</p>
              <input
                className='bg-[#2C333F]  py-[0.6rem] px-[0.4rem] rounded-md '
                type='password'
                required={true}
                name='newPassword'
                value={updatePasswordData?.newPassword}
                onChange={updatePasswordDataHandler}
              />
            </div>
            <div className='w-full flex flex-col'>
              <p>Confirm New Password</p>
              <input
                className='bg-[#2C333F]  py-[0.6rem] px-[0.4rem] rounded-md '
                type='password'
                required={true}
                name='confirmNewPassword'
                value={updatePasswordData?.confirmNewPassword}
                onChange={updatePasswordDataHandler}
              />
            </div>
          </div>
        </form>

        {/* delete account */}
        <div className='w-full flex flex-col justify-center items-center gap-6'>
          <div className='w-full flex gap-4 bg-[#340019] rounded-md p-5 mt-5'>
            <div className='bg-[#691432] text-[#EF476F] h-min rounded-full p-4 text-xl '>
              <RiDeleteBin6Line />
            </div>
            <div className='w-full flex flex-col gap-2 '>
              <p className='text-lg font-[700] text-[#FFF1F1] '>Delete Account</p>
              <p className='text-sm font-[500] text-[#FBC7D1] '>Would you like to delete account?</p>
              <p className='text-sm font-[500] text-[#FBC7D1] '>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
              <p
                onClick={() => dispatch(setDeleteAccountModal(true))}
                className='text-base font-[500] text-[#D43D63] italic underline cursor-pointer hover:text-[#f05757] w-fit '>
                I want to delete my account.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
};

export default Setting;
