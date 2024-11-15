import React, { useEffect, useState } from "react"
import { IoIosTv } from "react-icons/io";
import moment from "moment";

const SubSection = ({ subSection }) => {

    // Function to format time in mm:ss using moment.js
    const formatTime = (seconds) => {
        // Using moment to create a duration and format it to mm:ss
        return moment.utc(seconds * 1000).format("mm:ss"); // Convert seconds to milliseconds
    };

    return (
        <div className="my-4">
            {
                subSection?.map((subSection,index) => (
                    <div key={index} className="flex justify-between mx-4 my-2">
                        <div className="flex flex-col">
                            <div className="flex gap-2 items-center">
                                <IoIosTv />
                                <p className="text-sm font-[500] text-[#F1F2FF] "> {subSection?.title} </p>
                            </div>
                            <p className="text-sm font-[400] text-[#C5C7D4] ml-6 "> {subSection?.description} </p>
                        </div>
                        <p className="text-sm font-[400] text-[#DBDDEA] "> {formatTime(Math.floor(subSection.duration))} </p>
                    </div>
                ))
            }
        </div>
    )
};

export default SubSection;
