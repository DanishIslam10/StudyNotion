import React, { useEffect, useState } from "react"
import { IoListOutline } from "react-icons/io5";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import SubSection from "./SubSection";

const CourseContent = ({ section }) => {

    const [seeSubSection, setSeeSubSection] = useState(false)
    const [subSection, setSubSection] = useState([])
    const [totalDuration, setTotalDuration] = useState(0)

    useEffect(() => {
        setTotalDuration(Math.floor(section.totalDuration))
    }, [section.totalDuration]);    

    function sectionDropDownHandler(subSection) {
        setSeeSubSection((prev) => !prev)
        setSubSection(subSection)
    }

    return (
        <div className="text-white flex flex-col gap-2">
            <div className="border-[1px] border-[#4c4c4c] ">
                <div className="flex justify-between items-center bg-[#2C333F] text-sm font-[500] text-#F1F2FF p-4 ">
                    <div className="flex gap-1 sm:items-center mx-2">
                        <IoListOutline className="text-xl w-10 sm:w-fit " />
                        <p> {section?.sectionName} </p>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2" >
                            <p className="text-sm font-[400] mx-1 text-[#FFD60A] min-w-max " >{section?.subSection?.length} lectures</p>
                            <p className="text-sm font-[400] text-[#DBDDEA] min-w-max " >
                                {
                                    totalDuration > 60 ? (
                                        `${Math.floor(totalDuration/60)} min`
                                    ): (
                                        `${totalDuration} s`
                                    ) 
                            }
                            </p>
                        </div>
                        {
                            seeSubSection ? (
                                <FaAngleUp
                                    onClick={() => sectionDropDownHandler(section?.subSection)}
                                    className="ml-2 cursor-pointer hover:scale-125 " />
                            ) : (
                                <FaAngleDown
                                    onClick={() => sectionDropDownHandler(section?.subSection)}
                                    className="ml-2 cursor-pointer hover:scale-125 " />
                            )
                        }
                    </div>
                </div>
                {
                    seeSubSection &&
                    <SubSection subSection={subSection} />
                }
            </div>
        </div>
    )
};

export default CourseContent;
