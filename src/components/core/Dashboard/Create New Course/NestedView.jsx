import React, { useState } from "react"
import { useSelector } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import SubSectionModal from "./modals/CreateSubSection";
import Btn from "../../../common/Btn";
import SectionEntry from "./SectionEntry";

const NestedView = ({editSectionName,setEditSectionName,getSectionId}) => {

  const { course } = useSelector((state) => state.newCourse)
  const [subSectionModal, setSubSectionModal] = useState(false)
  const [sectionId, setSectionId] = useState("")
  // console.log("subsection modal: ", subSectionModal)
  // console.log("sectionId: ", sectionId)

  return (
    <div className="bg-[#2C333F] px-4 rounded-md " >
      <div>
        {
          course?.courseContent?.map((section,index) => (
            <SectionEntry 
            key={index}
            section={section} 
            editSectionName = {editSectionName} 
            setEditSectionName={setEditSectionName} 
            getSectionId = {getSectionId}
            />
          ))
        }
      </div>
    </div>
  )
};

export default NestedView;
