import React, { useState } from "react"
import { FaPlus } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { IoListOutline } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { useDeleteSection, useDeleteSubSection } from "../../../../services/operations/operations";
import CreateSubSectionModal from "./modals/CreateSubSection";
import ViewSubSectionModal from "./modals/ViewSubSection";
import EditSubSectionModal from "./modals/EditSubSection";

const SectionEntry = ({ section, editSectionName, setEditSectionName, getSectionId }) => {

    const [seeSubSections, setSeeSubSections] = useState(false)
    const [createSubSectionModal, setCreateSubSectionModal] = useState(false)
    const [viewSubSectionModal, setViewSubSectionModal] = useState(false)
    const [editSubSectionModal, setEditSubSectionModal] = useState(false)
    const [subSection, setSubSection] = useState(null) //needed to view sub section
    const [subSectionId, setSubSectionId] = useState(null) //needed to edit sub section

    console.log("view sub section : ", viewSubSectionModal)
    console.log("section data : ", section)
    console.log("sub section data : ", subSection)
    // const {course} = useSelector((state) => state.newCourse)

    const deleteSection = useDeleteSection()
    const deleteSubSection = useDeleteSubSection()

    function deleteSectionHandler() {
        deleteSection(section._id)
    }

    function editSectionHandler() {
        setEditSectionName(true)
        getSectionId(section._id)
    }

    function viewSubSectionModalHandler(subSection) {
        setSubSection(subSection)
        setViewSubSectionModal(true)
    }

    function deleteSubSectionHandler(subSectionId) {
        deleteSubSection(subSectionId)
    }

    function editSubSectionHandler(subSectionId) {
        setSubSectionId(subSectionId)
        setEditSubSectionModal(true)
    }

    return (
        <div>
            <div className="my-4">
                <div className="flex justify-between items-center">
                    <div className="flex gap-1 items-center">
                        <IoListOutline className="text-[#6E727F] text-xl " />
                        <p className="text-[#C5C7D4] font-[600] " > {section.sectionName} </p>
                    </div>
                    <div className="flex md:gap-1 items-center text-xl text-[#6E727F] ">
                        <MdModeEditOutline onClick={editSectionHandler} className="hover:text-[#aeb2c1] cursor-pointer " />
                        <MdDelete onClick={deleteSectionHandler} className="hover:text-[#aeb2c1] cursor-pointer " />
                        <div className="w-[1px] bg-[#484b50] h-6 mx-2 " ></div>
                        {
                            seeSubSections ? (
                                <IoMdArrowDropup className="hover:text-[#aeb2c1] cursor-pointer " onClick={() => setSeeSubSections((prev) => !prev)} />
                            ) : (
                                <IoMdArrowDropdown className="hover:text-[#aeb2c1] cursor-pointer " onClick={() => setSeeSubSections((prev) => !prev)} />
                            )
                        }
                    </div>
                </div>
                <div>
                    {
                        seeSubSections && section?.subSection?.map((item,index) => (
                            <div key={index}
                                className="md:ml-4 mt-2 p-2 rounded-md">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-1 items-center">
                                        <IoListOutline className="text-[#6E727F] text-xl " />
                                        <p className="text-[#C5C7D4] text-base " > {item.title} </p>
                                    </div>
                                    <div className="flex md:gap-2 items-center text-xl text-[#6E727F] ">
                                        <MdModeEditOutline onClick={() => editSubSectionHandler(item._id)} className="hover:text-[#aeb2c1] cursor-pointer " />
                                        <MdDelete onClick={() => deleteSubSectionHandler(item._id)} className="hover:text-[#aeb2c1] cursor-pointer " />
                                        <div className="w-[1px] bg-[#484b50] h-6 mx-2 " ></div>
                                        <button
                                            type="button"
                                            onClick={() => viewSubSectionModalHandler(item)}
                                            className="text-sm text-[#C5C7D4] shadow-[0px_0px_0px_1px_rgb(146,148,147)] 
                                            px-1 rounded-md transition-all duration-150 hover:scale-105 "
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full h-[1px] bg-[#484b50] my-1 " ></div>
                            </div>
                        ))
                    }
                </div>
                {
                    !seeSubSections &&
                    <div className="w-full h-[1px] bg-[#484b50] my-1 " ></div>
                }
                {
                    seeSubSections && (
                        <button
                            type="button"
                            onClick={() => setCreateSubSectionModal(true)}
                            className="flex gap-1 items-center text-[#FFD60A] my-2 hover:scale-105 " >
                            <FaPlus />
                            <p>Add Lecture</p>
                        </button>
                    )
                }
            </div>
            <CreateSubSectionModal
                createSubSectionModal={createSubSectionModal}
                setCreateSubSectionModal={setCreateSubSectionModal}
                sectionId={section._id} />
            <ViewSubSectionModal
                viewSubSectionModal={viewSubSectionModal}
                setViewSubSectionModal={setViewSubSectionModal}
                subSection={subSection}
            />
            <EditSubSectionModal
                editSubSectionModal={editSubSectionModal}
                setEditSubSectionModal={setEditSubSectionModal}
                subSectionId={subSectionId}
            />
        </div>
    )
};

export default SectionEntry;
