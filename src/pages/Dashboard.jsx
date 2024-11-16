import React from "react"
import { Outlet } from "react-router";
import Sidebar from "../components/common/Sidebar";
import { useSelector } from "react-redux";
import LogoutModal from "../components/core/Dashboard/Modals/LogoutModal";
import ChangeDpModal from "../components/core/Dashboard/Modals/changeDpModal";
import RemoveDpModal from "../components/core/Dashboard/Modals/RemoveDpModal";
import DeleteAccountModal from "../components/core/Dashboard/Modals/DeleteAccountModal";
import UpdatePasswordModal from "../components/core/Dashboard/Modals/UpdatePasswordModal";

const Dashboard = (props) => {

  const { logoutModal, dpModal, removeDpModal, deleteAccountModal, updatePasswordModal,showSideBar } = useSelector((state) => state.profile)

  return (
    <div className={`${showSideBar && "blur-sm"} w-full flex`}>
      <div className="sidebar min-h-[100vh] hidden sm:block lg:w-[15%] w-[25%] text-[#838894] text-sm bg-[#161D29]">
        <Sidebar />
      </div>
      <div className="relative lg:w-[85%] sm:w-[75%] w-full ">
        <Outlet />
        {
          logoutModal &&
          <div className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
            <LogoutModal />
          </div>
        }
        {
          dpModal &&
          <div className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
            <ChangeDpModal />
          </div>
        }
        {
          removeDpModal &&
          <div className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
            <RemoveDpModal />
          </div>
        }
        {
          deleteAccountModal &&
          <DeleteAccountModal />
        }
        {
          updatePasswordModal &&
          <UpdatePasswordModal/>
        }
      </div>
    </div>
  )
};

export default Dashboard;
