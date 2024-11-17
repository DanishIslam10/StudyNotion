import React, { useState } from "react"
import Btn from "../../../common/Btn";
import { IoIosArrowBack } from "react-icons/io";
import toast from "react-hot-toast";
import { useSetCourseStatus } from "../../../../services/operations/operations";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setStep } from "../../../../slices/newCourseSlice";
import { useNavigate } from "react-router";

const PublishCourse = (props) => {

  const { course } = useSelector((state) => state.newCourse)
  const [confirmPublish, setPublishCourse] = useState(false)
  console.log(confirmPublish)

  const dispatch = useDispatch()

  const setCourseStatus = useSetCourseStatus()

  function publishCourseHandler() {
    if (!confirmPublish) {
      toast.error("Please tick the CheckBox")
      return
    }
    setCourseStatus(course._id, "Published")
  }

  function saveAsDraftHandler() {
    setCourseStatus(course._id,"Drafted")
  }

  return (
    <div className="flex flex-col gap-10" >
      <div className="flex flex-col gap-4 bg-[#161D29] p-5 rounded-md ">
        <p className="text-xl font-[600] text-[#F1F2FF] " >Publish Settings</p>
        <div className="flex gap-2 items-center" >
          <input
            type="checkbox"
            checked={confirmPublish}
            onChange={() => setPublishCourse((prev) => !prev)}
            id="confirmPublish"
            className=""
          />
          <label
            htmlFor="confirmPublish" className="text-[#6E727F] font-[500]" >
            Make this Course Public
          </label>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <Btn color="#161D29" textColor="#F1F2FF"
          onClickFunction={() => dispatch(setStep(2))} >
          <div className="flex gap-1 items-center">
            <IoIosArrowBack />
            <p>Back</p>
          </div>
        </Btn>
        <div className="flex gap-4">
          <Btn onClickFunction={saveAsDraftHandler} children="Save as Draft" color="#161D29" textColor="#F1F2FF" />
          <Btn onClickFunction={publishCourseHandler} children="Save and Publish" color="#FFD60A" textColor="#000814" />
        </div>
      </div>
    </div>
  )
};

export default PublishCourse;
