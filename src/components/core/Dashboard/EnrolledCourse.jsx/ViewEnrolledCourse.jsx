import React, { useState } from "react"
import { useSelector } from "react-redux";
import Section from "./Section";
import ReactPlayer from "react-player";

const ViewEnrolledCourse = (props) => {
    const [viewingLectureData, setViewinglectureData] = useState(null)

    const course = localStorage.getItem("enrolledCourse") &&
        JSON.parse(localStorage.getItem("enrolledCourse"))

    console.log("course details to view: ", course)

    function getViewingLectureData(viewingLectureData) {
        setViewinglectureData(viewingLectureData)
    }

    return (
        <div>
            <div className="flex">
                <div className="w-[25%] flex flex-col gap-2 min-h-screen bg-[#161D29]">
                    {
                        course?.courseContent?.map((section, index) => (
                            <Section
                                key={index}
                                section={section}
                                getViewingLectureData={getViewingLectureData}
                            />
                        ))
                    }
                </div>
                <div className="w-[75%] flex flex-col gap-2 p-4 ">
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
            </div>
        </div>
    )
};

export default ViewEnrolledCourse;
