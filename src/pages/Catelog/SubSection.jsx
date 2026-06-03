import React from "react"
import { IoIosTv } from "react-icons/io";
import moment from "moment";

const SubSection = ({ subSection }) => {

    // Function to format time in mm:ss using moment.js
    const formatTime = (seconds) => {
        // Using moment to create a duration and format it to mm:ss
        return moment.utc(seconds * 1000).format("mm:ss"); // Convert seconds to milliseconds
    };

    return (
        <div className="p-3 sm:p-5 space-y-4">
            {
                subSection?.map((subSection, index) => (
                    <div
                        key={index}
                        className="group flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-indigo-500/[0.06] hover:border-indigo-400/20 transition-all duration-300 p-4"
                    >

                        {/* LEFT CONTENT */}
                        <div className="flex gap-4 flex-1">

                            {/* Video Icon */}
                            <div className="shrink-0 mt-1">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/20 group-hover:scale-105 transition-transform duration-300">
                                    <IoIosTv className="text-xl text-indigo-300" />
                                </div>
                            </div>

                            {/* Title + Description */}
                            <div className="flex flex-col gap-2 flex-1">

                                {/* Title */}
                                <div className="flex items-center gap-2 flex-wrap">

                                    <p className="text-sm sm:text-base font-semibold text-[#F8FAFC] leading-relaxed">
                                        {subSection?.title}
                                    </p>

                                    {/* Free Preview Badge Example */}
                                    <span className="hidden sm:flex text-[10px] font-medium px-2 py-1 rounded-full bg-green-500/10 border border-green-400/20 text-green-300">
                                        Video Lesson
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-[#94A3B8] leading-relaxed">
                                    {subSection?.description}
                                </p>

                                {/* Mobile Duration */}
                                <div className="sm:hidden flex items-center gap-2 pt-1">
                                    <div className="h-2 w-2 rounded-full bg-cyan-400"></div>

                                    <p className="text-xs text-cyan-300 font-medium">
                                        {formatTime(Math.floor(subSection.duration))}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE DURATION */}
                        <div className="hidden sm:flex items-center">
                            <div className="flex items-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-400/20 px-3 py-2 min-w-fit">

                                {/* Dot */}
                                <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>

                                <p className="text-sm font-medium text-cyan-300 whitespace-nowrap">
                                    {formatTime(Math.floor(subSection.duration))}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
};

export default SubSection;
