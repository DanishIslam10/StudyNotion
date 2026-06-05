import React from "react"
import { IoIosTv } from "react-icons/io";
import moment from "moment";
import { FaRegClock } from "react-icons/fa";

const SubSection = ({ subSection }) => {

    // Function to format time in mm:ss using moment.js
    const formatTime = (seconds) => {
        // Using moment to create a duration and format it to mm:ss
        return moment.utc(seconds * 1000).format("mm:ss"); // Convert seconds to milliseconds
    };

    return (
        <div className="p-3 sm:p-4 flex flex-col gap-2">
            {subSection?.map((subSection, index) => (
                <div
                    key={index}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.06]
        bg-[#0d1526] hover:bg-[#111c35] hover:border-indigo-500/20
        transition-all duration-200 p-3 sm:p-4"
                >

                    {/* LEFT */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">

                        {/* Icon box */}
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl
          border border-white/10 bg-[#111c35]
          group-hover:border-indigo-500/30 group-hover:bg-[#152040]
          transition-all duration-200">
                            <IoIosTv className="text-sm text-indigo-400" />
                        </div>

                        {/* Title + description */}
                        <div className="flex flex-col min-w-0 gap-0.5">
                            <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-sm font-semibold text-white leading-snug truncate">
                                    {subSection?.title}
                                </p>
                                <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-indigo-500/30
              bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-medium text-indigo-300">
                                    <div className="h-1 w-1 rounded-full bg-indigo-400" />
                                    Video
                                </span>
                            </div>

                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-1">
                                {subSection?.description}
                            </p>
                        </div>
                    </div>

                    {/* RIGHT — duration */}
                    <div className="flex items-center gap-2 shrink-0 rounded-xl border border-white/10
        bg-[#111c35] px-3 py-1.5 transition-all duration-200
        group-hover:border-indigo-500/20">
                        <FaRegClock className="text-[10px] text-slate-500" />
                        <p className="text-xs font-medium text-slate-400 whitespace-nowrap">
                            {formatTime(Math.floor(subSection.duration))}
                        </p>
                    </div>

                </div>
            ))}
        </div>
    )
};

export default SubSection;
