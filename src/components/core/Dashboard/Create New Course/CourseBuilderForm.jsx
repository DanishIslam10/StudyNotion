import React, { useState } from "react"
import { useForm } from "react-hook-form";
import Btn from "../../../common/Btn";
import { IoIosArrowBack, IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import toast from "react-hot-toast";
import { setEditCourse, setStep } from "../../../../slices/newCourseSlice";
import NestedView from "./NestedView";
import { useCreateSection, useUpdateSection } from "../../../../services/operations/operations";

const CourseBuilderForm = (props) => {

  const { course } = useSelector((state) => state.newCourse);
  // console.log("course data from newCourse Slice: ", course)
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()
  const [editSectionName, setEditSectionName] = useState(false)
  const [sectionId, setSectionId] = useState("")
  // console.log("section id update hone wali: ",sectionId)
  const dispatch = useDispatch()

  const createSection = useCreateSection()
  const updateSection = useUpdateSection()

  function cancelSectionNameEdit() {
    setEditSectionName(false)
    setValue("sectionName", "")
    dispatch(setEditCourse(true))
  }

  function goBack() {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  function goToNext() {
    if (course?.courseContent?.length === 0) {
      toast.error("Add atleast one section in the course.")
      return
    }
    if (course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Add atleast one sub section in each section")
      return
    }
    dispatch(setStep(3))
  }

  //this function will fetch sectionId which is needed to update section
  //this will be done by sending the data from child to parent
  //so we will send function as prop to fetch sectionId from child component
  function getSectionId(sectionId) {
    setSectionId(sectionId)
  }

  function submitNewSectionData(data) {
    if (editSectionName) {
      updateSection({
        newSectionName: data.sectionName,
        sectionId,
      })
      setEditSectionName(false)
      reset()
      return
    }
    createSection({
      sectionName: data.sectionName,
      courseId: course._id
    })
    reset()
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit(submitNewSectionData)} className="course-builder-form flex flex-col gap-4 bg-[#161D29] md:p-4 p-2 rounded-md ">
        <div>
          <p className="text-2xl text-[#F1F2FF] font-[600] " >Course Builder</p>
        </div>
        <div className="flex flex-col gap-4">
          {
            course?.courseContent && (
              <NestedView
                editSectionName={editSectionName}
                setEditSectionName={setEditSectionName}
                getSectionId={getSectionId}
              />
            )
          }
          <div>
            <input
              type="text"
              placeholder="Add a section to build your course"
              {...register("sectionName", { required: true })}
            />
            {
              errors.sectionName && (
                <span>Section name is required</span>
              )
            }
          </div>
          <div className="flex gap-2">
            <Btn type="submit" color="#161D29" textColor="#FFD60A" style={{ border: "1px solid #FFD60A" }} >
              {
                editSectionName ? (
                  <div>
                    <p>Edit Section Name</p>
                  </div>
                ) : (
                  <div className="flex gap-1 items-center">
                    <IoMdAddCircleOutline />
                    <p>Create Section</p>
                  </div>
                )
              }
            </Btn>
            {
              editSectionName &&
              <button type="button"
                className="text-[#7e7e7e] text-sm font-[400] underline hover:text-[#b2b1b1] "
                onClick={cancelSectionNameEdit}>
                Cancel edit
              </button>
            }
          </div>
        </div>
      </form>
      <div className="flex justify-end">
        <div className="flex gap-2">
          <Btn onClickFunction={goBack} color="#161D29" textColor="#F1F2FF" >
            <div className="flex gap-1 items-center">
              <IoIosArrowBack />
              <p>Back</p>
            </div>
          </Btn>
          <Btn onClickFunction={goToNext} color="#FFD60A" textColor="#000814" >
            <div className="flex gap-1 items-center">
              <p>Next</p>
              <IoIosArrowForward />
            </div>
          </Btn>
        </div>
      </div>
    </div>
  )
};

export default CourseBuilderForm;
