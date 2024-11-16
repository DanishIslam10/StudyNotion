import React, { useState } from "react"
import { useSelector } from "react-redux";
import Section from "./Section";
import ReactPlayer from "react-player";
import Btn from "../../../common/Btn";
import { MdOutlineVideoLibrary } from "react-icons/md";

const ViewEnrolledCourse = (props) => {
    const [viewingLectureData, setViewinglectureData] = useState(null)
    const [viewLecturesSidebar, setViewLecturesSidebar] = useState(true)
    const [viewLecture, setViewLecture] = useState(false)

    const course = localStorage.getItem("enrolledCourse") &&
        JSON.parse(localStorage.getItem("enrolledCourse"))

    console.log("course details to view: ", course)

    function getViewingLectureDataForLg(viewingLectureData) {
        // setViewLecturesSidebar(false)
        setViewLecture(true)
        setViewinglectureData(viewingLectureData)
    }

    function getViewingLectureDataForSm(viewingLectureData) {
        setViewLecturesSidebar(false)
        setViewLecture(true)
        setViewinglectureData(viewingLectureData)
    }

    function viewLecturesSidebarHandler() {
        setViewLecture(false)
        setViewLecturesSidebar(true)
        setViewinglectureData(null)
    }

    return (
        <div>
            <div className="flex flex-row ">
                {
                    viewLecturesSidebar &&
                    <div className="w-[50%] md:w-[40%] lg:w-[25%] flex flex-col gap-2 min-h-screen bg-[#161D29]">
                        {
                            course?.courseContent?.map((section, index) => (
                                <Section
                                    key={index}
                                    section={section}
                                    getViewingLectureDataForLg={getViewingLectureDataForLg}
                                    getViewingLectureDataForSm={getViewingLectureDataForSm}
                                />
                            ))
                        }
                    </div>
                }
                {
                    viewLecture &&
                    <div className="sm:w-[75%] flex flex-col gap-2 p-4 ">
                        <button 
                        onClick={viewLecturesSidebarHandler}
                        className="sm:hidden flex gap-1 items-center bg-[#434343] rounded-md text-[white] w-fit p-2 ">
                            <MdOutlineVideoLibrary />
                            <p>View Lectures</p>
                        </button>
                        <div className="flex flex-col gap-1 px-2 ">
                            <p className="text-2xl text-[#d9d9d9] font-[600] "> {viewingLectureData?.title} </p>
                            <p className="text-lg text-[#919191] font-[500] "> {viewingLectureData?.description} </p>
                        </div>
                        <div>
                            {
                                <ReactPlayer
                                    url={viewingLectureData?.videoUrl}
                                    controls
                                    width="100%"
                                    height="100%"
                                />
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
};

export default ViewEnrolledCourse;
