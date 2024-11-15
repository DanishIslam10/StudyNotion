import React, { useState } from "react"
import moment from "moment";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import SubSection from "./SubSection";

const Section = ({ section,getViewingLectureData }) => {

    const [viewSubSections, setViewSubSections] = useState(false)
    
    const formatTime = (seconds) => {
        // Using moment to create a duration and format it to mm:ss
        return moment.utc(seconds * 1000).format("mm:ss"); // Convert seconds to milliseconds
    };

    return (
        <div>
            <div className="bg-[#2C333F] p-4">
                <div className="flex justify-between gap-2">
                    <p className="text-sm text-[#F1F2FF] "> {section.sectionName} </p>
                    <div className="flex gap-2 text-sm  text-[#F1F2FF] ml-1">
                        <div className="flex gap-2 items-center h-fit">
                            <p> {formatTime(Math.floor(section.totalDuration))} </p>
                            {
                                viewSubSections ? (
                                    <FaChevronUp className="cursor-pointer hover:scale-110" onClick={() => setViewSubSections((prev) => !prev)} />
                                ) : (
                                    <FaChevronDown className="cursor-pointer hover:scale-110" onClick={() => setViewSubSections((prev) => !prev)} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                viewSubSections &&
                <div className="my-2">
                    {
                        section?.subSection?.map((subSection, index) => (
                            <SubSection 
                            key={index} 
                            subSection={subSection}
                            getViewingLectureData = {getViewingLectureData}
                            />
                        ))
                    }
                </div>
            }
        </div>
    )
};

export default Section;
